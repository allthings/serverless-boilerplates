import test from 'ava'
import * as handler from './handler'

const testEvent = {}

const testContext: AWSLambda.Context = {
  callbackWaitsForEmptyEventLoop: true,
  functionName: 'test',
  functionVersion: 'test',
  invokedFunctionArn: 'arn:aws:test',
  memoryLimitInMB: 128,
  awsRequestId: 'test',
  logGroupName: 'test',
  logStreamName: 'test',

  getRemainingTimeInMillis: () => 1000 * 30,

  done: () => undefined,
  fail: () => undefined,
  succeed: () => undefined,
}

test('hello handler', async (t): Promise<void> => {
  await t.throws(handler.hello(undefined, undefined, undefined))

  const promise = handler.hello(testEvent, testContext, (error, result) => {
    t.is(error, null, 'handler should not return an error')
    t.deepEqual(result, {
      foo: 'bar',
    })
  })

  await t.notThrows(promise, 'handler should not throw an error')
})
