import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class LambdaLithStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // =====================================================================
    // Lambda Function
    // =====================================================================
    const lambdaFunction = new lambda.Function(this, "LambdaLith", {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "main.handler",
    });

    // =====================================================================
    // Defines an API Gateway REST API with AWS Lambda proxy integration
    // =====================================================================
    const api = new apigateway.LambdaRestApi(this, "LithApi", {
      handler: lambdaFunction,
    });
  }
}
