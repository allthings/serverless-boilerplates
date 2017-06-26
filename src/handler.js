// eslint-disable-next-line import/prefer-default-export
export async function hello (event, context, callback) {
  /* For API Gateway response:
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  }
  */

  const response = {
    foo: 'bar',
  }

  callback(null, response)
}
