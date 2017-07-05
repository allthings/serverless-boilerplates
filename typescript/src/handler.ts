/*
List of Lambda type definitions at:
https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/aws-lambda/index.d.ts
*/

export async function hello (
  event: any,
  context: AWSLambda.Context,
  callback: AWSLambda.Callback
): Promise<void> {
  const response = {
    foo: 'bar',
  }

  callback(null, response)
}
