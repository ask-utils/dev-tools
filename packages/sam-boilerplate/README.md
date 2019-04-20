# SAM template Boilerplate for Alexa Skill Backend

Simply boilerplate for Alexa Skill Backend.

## Usage

```javascript
const { generateBoilerplate } = require('sam-boilerplate');

const stack = generateBoilerplate({
  format: 'yaml'
})
```

You can get SAM template

```yaml
Transform: 'AWS::Serverless-2016-10-31'
Parameters:
  Stage:
    Type: String
    Default: production
    Description: stage
Conditions:
  IsProduction:
    'Fn::Equals':
      - Ref: Stage
      - production
Resources:
  LambdaRole3A44B857:
    Type: 'AWS::IAM::Role'
    Properties:
      AssumeRolePolicyDocument:
        Statement:
          - Action: 'sts:AssumeRole'
            Effect: Allow
            Principal:
              Service:
                'Fn::Join':
                  - ''
                  - - lambda.
                    - Ref: 'AWS::URLSuffix'
        Version: '2012-10-17'
      Path: /service-role/
  AlexaSkillFunction:
    Type: 'AWS::Serverless::Function'
    Properties:
      CodeUri: src
      Handler: index.handler
      Runtime: nodejs8.10
      AutoPublishAlias:
        Ref: Stage
      DeploymentPreference:
        Enabled: true
        Type:
          'Fn::If':
            - IsProduction
            - Linear10PercentEvery1Minute
            - AllAtOnce
      Events:
        AlexaSkill:
          Properties: {}
          Type: AlexaSkill
      Role:
        'Fn::GetAtt':
          - LambdaRole3A44B857
          - Arn
  SkillFunctionLogGroup:
    Type: 'AWS::Logs::LogGroup'
    Properties:
      LogGroupName:
        'Fn::Join':
          - /
          - - /aws/lambda
            - Ref: AlexaSkillFunction
      RetentionInDays: 14
```

And you can easy to get SAM stack with IAM role for S3 and DynamoDB

```javascript
console.log(generateBoilerplate({
  format: 'yaml',
  dbTableNames: ['test'],
  s3BucketNames: ['brabra']
}))
```

This is the result


```yaml
Transform: 'AWS::Serverless-2016-10-31'
Parameters:
  Stage:
    Type: String
    Default: production
    Description: stage
Conditions:
  IsProduction:
    'Fn::Equals':
      - Ref: Stage
      - production
Resources:
  LambdaPolicy7FF67BE6:
    Type: 'AWS::IAM::Policy'
    Properties:
      PolicyDocument:
        Statement:
          - Action:
              - 'dynamodb:PutItem'
              - 'dynamodb:DeleteItem'
              - 'dynamodb:GetItem'
            Effect: Allow
            Resource: 'arn:aws:dynamodb:*:*:table/test'
          - Action:
              - 's3:PutObject'
              - 's3:GetObject'
              - 's3:DeleteObject'
            Effect: Allow
            Resource: 'arn:aws:s3:::brabra/*'
        Version: '2012-10-17'
      PolicyName: BoilerPlateStackInlinePolicy
      Roles:
        - Ref: LambdaRole3A44B857
  LambdaRole3A44B857:
    Type: 'AWS::IAM::Role'
    Properties:
      AssumeRolePolicyDocument:
        Statement:
          - Action: 'sts:AssumeRole'
            Effect: Allow
            Principal:
              Service:
                'Fn::Join':
                  - ''
                  - - lambda.
                    - Ref: 'AWS::URLSuffix'
        Version: '2012-10-17'
      Path: /service-role/
  AlexaSkillFunction:
    Type: 'AWS::Serverless::Function'
    Properties:
      CodeUri: src
      Handler: index.handler
      Runtime: nodejs8.10
      AutoPublishAlias:
        Ref: Stage
      DeploymentPreference:
        Enabled: true
        Type:
          'Fn::If':
            - IsProduction
            - Linear10PercentEvery1Minute
            - AllAtOnce
      Events:
        AlexaSkill:
          Properties: {}
          Type: AlexaSkill
      Role:
        'Fn::GetAtt':
          - LambdaRole3A44B857
          - Arn
  SkillFunctionLogGroup:
    Type: 'AWS::Logs::LogGroup'
    Properties:
      LogGroupName:
        'Fn::Join':
          - /
          - - /aws/lambda
            - Ref: AlexaSkillFunction
      RetentionInDays: 14
```

## Function

### generateBoilerplate()

Generate SAM template.

```typescript
const stack = generateBoilerplate( {
    name: 'BoilerPlateStack',
    codeUri: 'src',
    handler: 'index.handler',
    s3BucketNames: [],
    dbTableNames: [],
    productionStageName: 'production',
    format: 'json'
  }
)
```