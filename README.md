# Serverless development patterns


## Contents
1. [Setup](#setup)
1. [Development](#development)
    1. [Invoke Locally](#invoke-locally)
    1. [Developing with tests](#developing-with-tests)
    1. [With Localhost HTTP](#with-localhost-http)
    1. [Locally Invoke in Docker](#locally-invoke-in-docker)
    1. [Run as a service within Allthings Docker dev-env](#run-as-a-service-with-allthings-docker-dev-env)
1. [Deployment](#deployment)
1. [Invocation](#invocation)
1. [Logs](#logs)
1. [Metrics](#metrics)
1. [How-to](#How-to)
    1. [Babel](#babel)
    1. [TypeScript](#typescript)
    1. [Production Stacktrace](#production-stacktrace)



## Setup

Clone it. Yarn it.

```bash
yarn
```

Then, make sure to change the service name in `serverless.yml`.


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


## Invocation

To manually invoke the deployed function from your terminal:

```bash
yarn invoke myFunctionName --path event-mocks/scheduled-event.json
```

or

```bash
yarn invoke myFunctionName --data '{"some": "eventData"}'
```


## Logs

See logs for a function from CloudWatch in your terminal:

```bash
yarn logs myFunctionName
```


## Metrics

See metrics for a function in your terminal:

```bash
yarn metrics myFunctionName
```


## How-to

### Babel

Sure.

@TODO

### TypeScript

Easy.

@TODO

### Production Stacktrace

Yes.

@TODO.
