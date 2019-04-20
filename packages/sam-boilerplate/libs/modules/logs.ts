import * as cdk from '@aws-cdk/cdk';
import * as Logs from '@aws-cdk/aws-logs'
import {CfnFunction} from '@aws-cdk/aws-sam'

export default (stack: cdk.Stack, lambda: CfnFunction):Logs.CfnLogGroup => {
  const group = new Logs.CfnLogGroup(
    stack,
    'SkillFunctionLogGroup',
    {
      logGroupName: cdk.Fn.join('/', [
        '/aws/lambda',
        lambda.functionName
      ]),
      retentionInDays: 14
    }
  )
  return group
}