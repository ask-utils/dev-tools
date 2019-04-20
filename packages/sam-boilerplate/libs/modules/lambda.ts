import * as cdk from '@aws-cdk/cdk';
import * as SAM from '@aws-cdk/aws-sam'
import createIAMRole from './iam'
import { Config, StackProps } from '../index'

export default (stack: cdk.Stack, id: string, config: Config, stackProps: StackProps) => {
  const { parameters } = stackProps
  const role = createIAMRole(stack, id, config)
  const lambda = new SAM.CfnFunction(
    stack,
    'AlexaSkillFunction',
    {
      handler: config.handler,
      runtime: 'nodejs8.10',
      codeUri: config.codeUri,
      role: role.roleArn,
      autoPublishAlias: parameters.stage.ref,
      deploymentPreference: {
        enabled: true,
        type: cdk.Fn.conditionIf('IsProduction', 'Linear10PercentEvery1Minute', 'AllAtOnce').toString()
      },
      events: {
        AlexaSkill: {
          type: "AlexaSkill",
          properties: {}
        }
      }
    }
  )
  return lambda
}