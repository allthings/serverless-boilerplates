import 'source-map-support/register'
import handler from 'alagarr'
import AwsXray from 'aws-xray-sdk-core'
import kmsDecrypt from './utils/kms'
import { getItem, putItem } from './utils/dynamodb'

// The DynamoDB table name where we're storing our items
const THING_TABLE = 'things'

const { STAGE = 'development', CDN_HOST_URL = '' } = process.env
const IS_PRODUCTION = STAGE !== 'development'

const handlerConfig = {
  cspPolicies: {
    'child-src': '*',
    'connect-src': '*',
    'default-src': "'self'",
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
      'https://netdna.bootstrapcdn.com/font-awesome/',
      CDN_HOST_URL,
    ].join(' '),
    'frame-ancestors': "'self'",
    'frame-src': '*',
    'img-src': `* data: blob: ${CDN_HOST_URL}`,
    'report-uri': '/csp-reports',
    'script-src': [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'https://*.google-analytics.com',
      'https://*.google.com',
      'https://*.gstatic.com',
      'https://*.mxpnl.com/',
      'https://mixpanel.com',
      CDN_HOST_URL,
    ].join(' '),
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', CDN_HOST_URL].join(' '),
  },
  enableCompression: STAGE !== 'development',
  headers: {
    'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
  },
}

/*
  Enable X-Ray in production
  See the results here:
  https://console.aws.amazon.com/xray/home#/service-map
*/
if (IS_PRODUCTION) {
  AwsXray.captureHTTPsGlobal(require('http')) // eslint-disable-line global-require
  AwsXray.captureHTTPsGlobal(require('https')) // eslint-disable-line global-require
}

export default handler(async (request, response) => {
  const SUPER_SECRET = await kmsDecrypt(process.env.SUPER_SECRET || '') // result gets cached :-)
  const { body: webhookPayload } = request
  const { id } = webhookPayload

  if (SUPER_SECRET !== process.env.SUPER_SECRET) {
    // tslint:disable-next-line:no-expression-statement no-console
    console.log('SUPER_SECRET was decrypted.')
  }

  if (!id) {
    return response.json(
      { error: 'Missing required "id" field in JSON request body.', request: webhookPayload },
      400
    )
  }

  try {
    /*
      get item from DynamoDB which has a hash-key of 'id'
      'id' should be provided in the Request body (JSON)
      We want a ConsistentRead from DynamoDB (in other words,
      we want to be guaranteed to have the latest version)
    */
    const oldThing = (await getItem(THING_TABLE, id, { ConsistentRead: true })) || {}

    // Merge the content of the item we got from DDB with
    // the new values provided in the Request payload
    const newThing = { ...oldThing, ...webhookPayload }

    // Stick the new item back into DDB, replacing the old one
    // if there was one
    await putItem(THING_TABLE, newThing)

    // return from λ with JSON payload appropriate for API Gateway
    return response.json(newThing)
  } catch (error) {
    console.error('An error occurred', error)

    // return from λ with a 500 error
    return response.json(
      {
        error: process.env.STAGE === 'development' ? error : 'Internal server error occurred',
      },
      500
    )
  }
}, handlerConfig)
