import * as cdk from '@aws-cdk/cdk';
import { safeDump } from 'js-yaml'
import BoilerplateStack from './stack'

export type Format = 'json' | 'yaml' | 'yml'

const buildTemplateResponse = (template: {}, format = 'json') => {
  const type = format === 'yaml' ? 'yaml': 'json'
  if (type === 'json') return JSON.stringify(template)
  return safeDump(template)
}

type StackConfig = {
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

export const parseConfig = (config: StackConfig = {}): Config => {
  const defaultConfig: Config = {
    name: 'BoilerPlateStack',
    codeUri: 'src',
    handler: 'index.handler',
    s3BucketNames: [],
    dbTableNames: [],
    productionStageName: 'production',
    format: 'json'
  }
  return Object.assign({}, defaultConfig, config)
}

export const generateBoilerplate = (params: StackConfig = {}) => {
  const config = parseConfig(params)
  
  const app = new cdk.App()
  new BoilerplateStack(app, config.name, config)
  const { template } = app.synthesizeStack(config.name)
  return buildTemplateResponse(template, config.format)
}