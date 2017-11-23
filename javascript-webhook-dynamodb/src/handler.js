import 'source-map-support/register'
import handler from 'alagarr'
import AwsXray from 'aws-xray-sdk-core'
import { getItem, putItem } from './utils/dynamodb'

const THING_TABLE = 'thing-table'

/* Enable X-Ray in production */
if (process.env.STAGE !== 'development') {
  AwsXray.captureHTTPsGlobal(require('http')) // eslint-disable-line global-require
  AwsXray.captureHTTPsGlobal(require('https')) // eslint-disable-line global-require
}

export default handler(async (request, response) => {
  const { body: webhookPayload } = request
  const { id } = webhookPayload

  const oldThing = await getItem(THING_TABLE, id)

  const newThing = { ...oldThing, ...webhookPayload }

  await putItem(THING_TABLE, newThing)

  response.json(newThing)
})
