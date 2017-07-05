# Allthings Internal Serverless Boilerplates


## Contents
1. [Prerequisites](#prerequisites)
1. [Setup](#setup)
1. [IAM Credentials, Roles, and Permissions](#iam-credentials-roles-and-permissions)
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
    1. [ES2017](#babel)
    1. [TypeScript](#typescript)
    1. [Production Stacktrace](#production-stacktrace)
    1. [Native Node Modules](#native-node-modules)


## Prerequisites

You will need:

- An AWS IAM user account included in the `arn:aws:iam::799212276699:role/aws-lambda-basic-execution-role` role.
    - The account must have MFA enabled
- You will need [AWS Vault](https://github.com/99designs/aws-vault)
    - Your AWS credentials need to be in a profile called `allthings`

## Setup

Clone it. Yarn it.

```bash
yarn
```

Then, make sure to change the service name in `serverless.yml`.


## IAM Credentials, Roles, and Permissions

Yah. You need those.

@TODO

Any commands which interact with AWS APIs assume your IAM credentials are stored in [AWS Vault](https://github.com/99designs/aws-vault), and that the profile is called `allthings`—ideally with MFA enabled.

@TODO: expand on this.

You will need to add the following to your `~/.aws/config` file. Create it, if it does not exist.

```ini
[profile allthings]
region = eu-west-1
mfa_serial = arn:aws:iam::799212276699:mfa/your.username
```


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

You can also run the full test suite with coverage report:

```bash
yarn test
```


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

### ES2017

Yep. Check out the Babel [recipe](./tree/master/babel).


### TypeScript

No problem. Check out the Typescript [recipe](./tree/master/typescript).


### Production Stacktrace

Yes. Both the [Babel](./tree/master/babel) and [Typescript](./tree/master/typescript) recipes support this.

Haha. Just kidding. @TODO.


### Native Node Modules

Can do.

@TODO.
