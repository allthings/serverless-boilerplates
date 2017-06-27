import test from 'ava'
import { hello } from './handler'

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
