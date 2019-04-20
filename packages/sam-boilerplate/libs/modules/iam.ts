import * as cdk from '@aws-cdk/cdk';
import IAM = require('@aws-cdk/aws-iam')
import { Config } from '../index'

const getDynamoDBPolicies = (tableNames: string[] = []): IAM.PolicyStatement | null => {
  if (tableNames.length < 1) return null
  const dybamoDBPolicies = new IAM.PolicyStatement()
      .allow()
      .addActions(
        "dynamodb:PutItem",
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
      )
  tableNames.forEach((tableName: string) => dybamoDBPolicies.addResource(`arn:aws:dynamodb:*:*:table/${tableName}`))
  return dybamoDBPolicies
}
const getS3Policies = (bucketNames: string[] = []):IAM.PolicyStatement | null => {
  if (bucketNames.length < 1) return null
  const S3BucketPolicies = new IAM.PolicyStatement()
  .allow()
  .addActions(
    "s3:PutObject",
    "s3:GetObject",
    "s3:DeleteObject",
  )
bucketNames.forEach((bucketName: string) => S3BucketPolicies.addResource(`arn:aws:s3:::${bucketName}/*`))
return S3BucketPolicies
}

const createServicePolicy = (stack: cdk.Stack, id: string, config: Config): null | IAM.Policy => {
  const dynamoDBPolicies = getDynamoDBPolicies(config.dbTableNames)
  const s3Policies = getS3Policies(config.s3BucketNames)
  const statements = []
  if (dynamoDBPolicies) statements.push(dynamoDBPolicies)
  if (s3Policies) statements.push(s3Policies)
  if (statements.length < 1) return null;
  const servicePolicy = new IAM.Policy(
    stack,
    'LambdaPolicy',
    {
      policyName: `${id}InlinePolicy`,
      statements
    }
  )
  return servicePolicy
}

export default (stack: cdk.Stack, id: string, config: Config) => {
  const servicePolicy = createServicePolicy(stack, id, config)
  const serviceRole = new IAM.Role(
    stack,
    'LambdaRole',
    {
      assumedBy: new IAM.ServicePrincipal('lambda.amazonaws.com'),
      path: '/service-role/'
    }
  )
  if (servicePolicy) serviceRole.attachInlinePolicy(servicePolicy)
  return serviceRole
}