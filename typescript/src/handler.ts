export async function hello (event, context, callback, chromeInstance): Promise<void> {
  const response = {
    foo: 'bar',
  }

  callback(null, response)
}
