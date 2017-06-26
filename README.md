# Serverless development patterns


## Contents
1. [Development](#development)
  1. [Invoke Locally](#invoke-locally)
  1. [Developing with tests](#developing-with-tests)
  1. [With Localhost HTTP](#with-localhost-http)
  1. [Locally Invoke in Docker](#locally-invoke-in-docker)
  1. [Run as a service within Allthings Docker dev-env](#run-as-a-service-with-allthings-docker-dev-env)
1. [Deployment](#deployment)


## Development

### Invoke Locally:

```bash
yarn invoke:local myFunctionName --path event-mocks/scheduled-event.json
```

or

```bash
yarn invoke:local myFunctionName --data '{"some": "eventData"}'
```

### Developing with tests

```bash
yarn watch:test
```

Then, develop and run code via tests. See [src/handler.js](blob/master/src/handler.js) and [src/handler.test.js](blob/master/src/handler.test.js) for examples.


### With Localhost HTTP

```bash
yarn dev:offline
```

Uses [serverless-offline](https://github.com/dherault/serverless-offline)



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

### Run as a service within Allthings Docker dev-env

 lol. todo.

```bash
allthings-up
```

Then, access on `https://lambda.dev.allthings.me/dev/myFunctionName`

Just kidding. @TODO. lol.


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


### Stacktrace in Production

Yes.

@TODO.


### Babel

Sure.

@TODO

### TypeScript

Easy.

@TODO
