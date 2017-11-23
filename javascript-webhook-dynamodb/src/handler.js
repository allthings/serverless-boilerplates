import 'source-map-support/register'

export default async function handler (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(event),
    headers: {
      'content-type': 'application/json',
    },
  })
}
