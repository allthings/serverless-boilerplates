import handler from 'alagarr'
// @TODO: aws-xray-sdk-core  sucks. it's full of bloat.
import * as AwsXray from 'aws-xray-sdk-core'
import * as sourceMapSupport from 'source-map-support'

sourceMapSupport.install() // tslint:disable-line no-expression-statement

const STAGE = process.env.STAGE
const CDN_HOST_URL = process.env.CDN_HOST_URL || ''

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
if (STAGE !== 'development') {
  // tslint:disable:no-expression-statement no-var-requires
  AwsXray.captureHTTPsGlobal(require('http'))
  AwsXray.captureHTTPsGlobal(require('https'))
  // tslint:enable
}

// @ TODO: remove type 'any'
export default handler(async (request: any, response: any) => {
  const { body } = request

  return response.json({ message: 'Hi.', body })
}, handlerConfig)
