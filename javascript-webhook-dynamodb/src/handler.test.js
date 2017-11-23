import handler from './handler'

const testEvent = {}
const testContext = {}

function handlerPromise (event = testEvent, context = testContext) {
  return new Promise((resolve, reject) =>
    handler(event, context, (error, result) => (error ? reject(error) : resolve(result))))
}

describe('The handler', () => {
  it('should return an API Gateway-compatible object', async () => {
    const result = await handlerPromise({})

    expect(result.statusCode).toBeTruthy()

    expect(result.body).toBeTruthy()
    expect(typeof result.body).toBe('string')

    expect(result.headers).toBeTruthy()
    expect(result.headers['content-type']).toBeTruthy()
  })
})
