import AWS from 'aws-sdk'
import AwsXray from 'aws-xray-sdk-core'
import { name } from '../../package.json'

const TABLE_NAME_PREFIX = `${name}-`

/* Enable X-Ray in production */
const ddbClient =
  process.env.STAGE !== 'development'
    ? AwsXray.captureAWSClient(new AWS.DynamoDB.DocumentClient())
    : new AWS.DynamoDB.DocumentClient()

/*
  If `key` is a string, we assume the key Attribute is named "id"
  Otherwise key needs to be an object and it's up to you.
*/
function makeKey (key) {
  if (typeof key === 'string') {
    return { id: key }
  }

  return key
}

export async function getItem (table, key, options = {}) {
  const { ConsistentRead = true } = options

  const params = {
    TableName: TABLE_NAME_PREFIX + table,
    Key: makeKey(key),
    ConsistentRead,
  }

  return (await ddbClient.get(params).promise()).Item
}

/*
  get()
  Creates a new item, or replaces an old item with a new item.

  Note: if an Item with key already exists, put will completely replace (not merge) the
  existing item with new item. To update/merge/patch:
  http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
*/
export async function putItem (table, key, options = {}) {
  const { ConsistentRead = true } = options

  const params = {
    TableName: TABLE_NAME_PREFIX + table,
    Key: makeKey(key),
    ConsistentRead,
  }

  return ddbClient.put(params).promise()
}
