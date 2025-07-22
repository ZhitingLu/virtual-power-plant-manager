# a basic AWS Lambda function handler

def handler(event, context):
    print("Received event:", event)
    return {
        "statusCode": 200,
        "body": "Data processed successfully"
    }
