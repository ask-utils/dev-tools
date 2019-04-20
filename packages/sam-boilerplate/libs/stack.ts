import * as cdk from '@aws-cdk/cdk';
import createLambdaFunction from './modules/lambda'
import createLogGroup from './modules/logs'
import { Config, Parameters } from './index'

export default class BoilerplateStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, config: Config,  props?: cdk.StackProps) {
    super(scope, id, props);
    const parameters: Parameters = {
      stage: new cdk.CfnParameter(this, 'Stage', {
        type: 'String',
        description: 'stage',
        default: config.productionStageName
      })
    }
    const conditions = {
      isProduction: new cdk.CfnCondition(
        this,
        'IsProduction',
        {
          expression: cdk.Fn.conditionEquals(
            parameters.stage.ref,
            config.productionStageName
          )
        }
      )
    }
    const stackProps = {
      parameters,
      conditions,
      outputs: {}
    }
    const lambda = createLambdaFunction(this, id, config, stackProps)
    createLogGroup(this, lambda)
  }
}