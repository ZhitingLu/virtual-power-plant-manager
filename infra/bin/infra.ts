#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { VppStack } from '../lib/vpp-stack';

// Explicit type for environment variables
declare const process: {
    env: {
        CDK_DEFAULT_ACCOUNT?: string;
        CDK_DEFAULT_REGION?: string;
    };
};

const app = new cdk.App();

new VppStack(app, 'VirtualPowerPlantStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
    tags: {
        Project: 'virtual-power-plant',
    },
});