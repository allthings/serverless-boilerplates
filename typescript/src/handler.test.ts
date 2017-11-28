// tslint:disable:no-expression-statement
import handler from './handler'

const testEvent = {
  body: '{"id":"foobar"}',
  headers: {
    'content-type': 'application/json',
  },
}

const testContext = {}

function handlerPromise(event: any, context = testContext): Promise<any> {
  return new Promise((resolve, reject) =>
    handler(event, context, (error: any, result: any) => (error ? reject(error) : resolve(result)))
  )
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
})
