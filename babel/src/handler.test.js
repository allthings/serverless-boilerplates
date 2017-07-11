import test from 'ava'
import { hello } from './handler'
import AWS from 'aws-sdk'

const testEvent = {
  account: '123456789012',
  region: 'us-east-1',
  detail: {},
  'detail-type': 'Scheduled Event',
  source: 'aws.events',
  time: '1970-01-01T00:00:00Z',
  id: 'cdc73f9d-aea9-11e3-9d5a-835b769c0d9c',
  resources: ['arn:aws:events:us-east-1:123456789012:rule/my-schedule'],
}

const testContext = {}

test('hello handler', (t) => {
  const testCallback = (error, response) => {
    t.is(error, null, 'handler callback should not return an error.')
    t.deepEqual(response, { foo: 'bar' })
  }

  t.notThrows(() => hello(testEvent, testContext, testCallback))
})

test.skip('haha', async (t) => {
  const λ = new AWS.Lambda({ region: 'eu-west-1', endpoint: 'http://192.168.99.100:4574/' })

  const params = {
    FunctionName: 'allthings-lambda-sls-boilerplate-babel-dev-hello' /* required */,
    ClientContext: 'lol',
    InvocationType: 'RequestResponse',
    LogType: 'None',
    Payload: '{}',
    Qualifier: '1',
  }

  const result = await λ.invoke(params).promise()
  console.log('result', JSON.stringify(result))
})
