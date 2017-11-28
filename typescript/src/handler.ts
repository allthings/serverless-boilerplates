import handler from 'alagarr'
// @TODO: aws-xray-sdk-core sucks. it's full of bloat.
import * as AwsXray from 'aws-xray-sdk-core'
import 'source-map-support/register'
import kmsDecrypt from './utils/kms'

const { STAGE = 'development', CDN_HOST_URL = '' } = process.env
const IS_PRODUCTION = STAGE !== 'development'

const handlerConfig = {
  cspPolicies: {
    'child-src': '*',
    'connect-src': '*',
    'default-src': "'self'",
    'font-src': [
      `'self'`,
      'https://fonts.gstatic.com',
      'https://netdna.bootstrapcdn.com/font-awesome/',
      CDN_HOST_URL,
    ].join(' '),
    'frame-ancestors': "'self'",
    'frame-src': '*',
    'img-src': `* data: blob: ${CDN_HOST_URL}`,
    'report-uri': '/csp-reports',
    'script-src': [
      `'self'`,
      `'unsafe-inline'`,
      `'unsafe-eval'`,
      'https://*.google-analytics.com',
      'https://*.google.com',
      'https://*.gstatic.com',
      'https://*.mxpnl.com/',
      'https://mixpanel.com',
      CDN_HOST_URL,
    ].join(' '),
    'style-src': [`'self'`, `'unsafe-inline'`, 'https://fonts.googleapis.com', CDN_HOST_URL].join(
      ' '
    ),
  },
  enableCompression: IS_PRODUCTION,
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
  // tslint:disable:no-expression-statement no-var-requires
  AwsXray.captureHTTPsGlobal(require('http'))
  AwsXray.captureHTTPsGlobal(require('https'))
  // tslint:enable
}

// @TODO: remove type 'any'
export default handler(async (request: any, response: any) => {
  const SUPER_SECRET = await kmsDecrypt(process.env.SUPER_SECRET || '') // result gets cached :-)

  const { body } = request

  if (SUPER_SECRET !== process.env.SUPER_SECRET) {
    // tslint:disable-next-line:no-expression-statement no-console
    console.log('SUPER_SECRET was decrypted.')
  }

  return response.json({ message: 'Hi.', body })
}, handlerConfig)
