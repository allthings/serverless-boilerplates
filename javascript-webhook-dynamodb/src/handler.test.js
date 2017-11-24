import handler from './handler'

const testEvent = {
  body: '{"id":"foobar"}',
  headers: {
    'content-type': 'application/json',
  },
}

const testContext = {}

// Mock the dynamodb.js file because we don't want to make any actual AWS-SDK calls
jest.mock('./utils/dynamodb', () => ({
  getItem: () => ({ foo: 'bar' }),
  putItem: () => ({}),
}))

function handlerPromise (event, context = testContext) {
  return new Promise((resolve, reject) =>
    handler(event, context, (error, result) => (error ? reject(error) : resolve(result))))
}

describe('The handler', () => {
  it('should return an API Gateway-compatible object', async () => {
    const result = await handlerPromise(testEvent)

    expect(result.statusCode).toBeTruthy()

    expect(result.body).toBeTruthy()
    expect(typeof result.body).toBe('string')

    expect(result.headers).toBeTruthy()
    expect(result.headers['content-type']).toBeTruthy()
  })

  it('returns HTTP 400 if JSON request-body is missing "id" key', async () => {
    const result = await handlerPromise({ ...testEvent, body: '{}' })

    expect(result.statusCode).toBe(400)
  })
})
