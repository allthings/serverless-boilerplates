class LocalstackPlugin {
  constructor(serverless, options) {
    this.serverless = serverless
    const awsProvider = this.serverless.providers.aws
    const AWS = awsProvider.sdk
    const host = 'http://192.168.99.100'

    serverless.cli.log('Localstack Plugin: Overwriting endpoints')

    AWS.config.apigateway = { endpoint: `${host}:4567` }
    AWS.config.cloudformation = { endpoint: `${host}:4581` }
    AWS.config.cloudwatch = { endpoint: `${host}:4582` }
    AWS.config.lambda = { endpoint: `${host}:4574` }
    AWS.config.dynamodb = { endpoint: `${host}:4567` }
    AWS.config.s3 = { endpoint: `${host}:4572` }
    AWS.config.ses = { endpoint: `${host}:4579` }
    AWS.config.sns = { endpoint: `${host}:4575` }
    AWS.config.sqs = { endpoint: `${host}:4576` }
  }
}

module.exports = LocalstackPlugin
