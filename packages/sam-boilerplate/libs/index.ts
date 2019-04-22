import * as cdk from '@aws-cdk/cdk';
import { safeDump } from 'js-yaml'
import BoilerplateStack from './stack'

import {
  StackConfig,
  Config,
} from './model'

const buildTemplateResponse = (template: {}, format = 'json') => {
  const type = format === 'yaml' ? 'yaml': 'json'
  if (type === 'json') return JSON.stringify(template)
  return safeDump(template)
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