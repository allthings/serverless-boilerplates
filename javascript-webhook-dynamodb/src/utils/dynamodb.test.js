import AWS from 'aws-sdk'
import MOCK_AWS from 'aws-sdk-mock' // eslint-disable-line import/no-extraneous-dependencies

const testDynamoDbItem = { foo: 'bar' }

MOCK_AWS.setSDKInstance(AWS)

MOCK_AWS.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
  callback(null, { Item: testDynamoDbItem })
})

MOCK_AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
  callback(null, { Item: { foo: 'bar' } })
})

describe('getItem()', () => {
  it('should return a single item', async () => {
    const { getItem } = require('./dynamodb') // eslint-disable-line global-require

    expect(await getItem('table', '23')).toEqual(testDynamoDbItem)
    expect(await getItem('table', { SomeHashKey: 'foobar' })).toEqual(testDynamoDbItem)
  })
})

describe('putItem()', () => {
  it('should put a single item', async () => {
    const { putItem } = require('./dynamodb') // eslint-disable-line global-require
    const result = await putItem('table', testDynamoDbItem)

    expect(result).toBeTruthy()
  })
})
