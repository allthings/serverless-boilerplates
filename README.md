# Serverless development patterns


## Development

### Developing with tests

```bash
yarn watch:test
```

Then, develop and run code via tests.


### Locally Invoke in Docker

```bash
yarn test:docker handler.hello '{"some": "eventData"}'
```

Uses [docker-lambda](https://github.com/lambci/docker-lambda). Can also be used in tests:

```js
import dockerLambda from 'docker-lambda'

const lambdaCallbackResult = dockerLambda({
  event: { some: 'event' },
  taskDir: __dirname,
  dockerImage: 'lambci/lambda:nodejs6.10',
})
```

### With serverless-offline (when using API Gateway)

```bash
yarn dev
```

Uses [serverless-offline](https://github.com/dherault/serverless-offline)


### Invoke Locally:

```bash
yarn invoke:local myFunctionName --path event-mocks/scheduled-event.json
```

or

```bash
yarn invoke:local myFunctionName --data '{"some": "eventData"}'
```


## Deployment

Deploy entire service with all functions:

```bash
yarn deploy
```

Deploy specific function:

```bash
yarn deploy -f myFunctionName
```

Where `myFunctionName` is defined in the `functions` section of `serverless.yml`.
