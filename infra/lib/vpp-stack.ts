import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as redshift from '@aws-cdk/aws-redshift-alpha';
import { PythonFunction } from '@aws-cdk/aws-lambda-python-alpha';
import * as path from 'path';

export class VppStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // 1. Networking
        const vpc = new ec2.Vpc(this, 'Vpc', {
            maxAzs: 2,
            natGateways: 1,
        });

        // 2. ECS Cluster
        const ecsCluster = new ecs.Cluster(this, 'Cluster', { vpc });

        // 3. ClickHouse (simulated using Redshift)
        const redshiftCluster = new redshift.Cluster(this, 'ClickHouseCluster', {
            masterUser: {
                masterUsername: 'clickhouse_admin',
            },
            vpc,
            nodeType: redshift.NodeType.RA3_XLPLUS,
            numberOfNodes: 2,
        });

        // 4. Neon-compatible Postgres setup (RDS + Proxy placeholder)
        const dbSecret = new secretsmanager.Secret(this, 'DbSecret'); // Placeholder secret

        const rdsInstance = new rds.DatabaseInstance(this, 'NeonInstance', {
            engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_15 }),
            vpc,
            credentials: rds.Credentials.fromSecret(dbSecret),
            publiclyAccessible: false,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
            vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
        });

        const dbProxy = new rds.DatabaseProxy(this, 'NeonProxy', {
            proxyTarget: rds.ProxyTarget.fromInstance(rdsInstance),
            secrets: [dbSecret],
            vpc,
            iamAuth: true,
        });

        // 5. Lambda for data processing
        const processorLambda = new PythonFunction(this, 'DataProcessor', {
            entry: path.resolve(__dirname, '../../apps/lambda/data-processor'),
            runtime: lambda.Runtime.PYTHON_3_12,
            vpc,
            environment: {
                NEON_PROXY_ENDPOINT: dbProxy.endpoint,
                CLICKHOUSE_ENDPOINT: redshiftCluster.clusterEndpoint.hostname,
            },
        });

        // Grant Lambda access to Proxy
        dbProxy.grantConnect(processorLambda);

        // 6. EventBridge Setup
        const eventBus = new events.EventBus(this, 'PowerReadingsBus');

        const dlq = new sqs.Queue(this, 'EventDLQ');

        new events.Rule(this, 'ProcessReadingsRule', {
            eventBus,
            eventPattern: {
                source: ['iot.power'],
            },
            targets: [
                new targets.LambdaFunction(processorLambda, {
                    deadLetterQueue: dlq,
                    retryAttempts: 3,
                }),
            ],
        });

        // 7. ECS Fargate API
        const taskDef = new ecs.FargateTaskDefinition(this, 'ApiTask');
        taskDef.addContainer('AppContainer', {
            image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
            memoryLimitMiB: 512,
            cpu: 256,
        });

        new ecs.FargateService(this, 'ApiService', {
            cluster: ecsCluster,
            taskDefinition: taskDef,
            desiredCount: 2,
            healthCheckGracePeriod: cdk.Duration.seconds(60),
        });

        // 8. SNS/SQS Integration
        const notificationTopic = new sns.Topic(this, 'AlertsTopic');

        const alertsQueue = new sqs.Queue(this, 'AlertsQueue', {
            visibilityTimeout: cdk.Duration.minutes(5),
        });

        notificationTopic.addSubscription(new subs.SqsSubscription(alertsQueue));
    }
}
