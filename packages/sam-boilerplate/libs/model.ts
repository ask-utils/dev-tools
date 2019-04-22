import * as cdk from '@aws-cdk/cdk';
export type Format = 'json' | 'yaml' | 'yml'

export type StackConfig = {
  name?: string
  codeUri?: string
  handler?: string
  s3BucketNames?: string[]
  dbTableNames?: string[]
  productionStageName?: string
  format?: Format
} | {}
export type Config = {
  name: string
  codeUri: string
  handler: string
  s3BucketNames?: string[]
  dbTableNames?: string[]
  productionStageName: string
  format: Format
}
export type Parameters = {
  stage: cdk.CfnParameter,
}
export type Conditions = {
  isProduction: cdk.CfnCondition
}
export type Outputs = {}
export type StackProps = {
  parameters: Parameters,
  conditions: Conditions,
  outputs: Outputs,
}