# JS Webhook DynamoDB Allthings-API Boilerplate

Boilerplate AWS Lambda service which is invoked via API Gateway as a Webhook.
The Request to the service must include a JSON body with the webhook payload.
The webhook retrieves data from DynamoDB based on the JSON
payload,modifies/updates the data with the payload, and saves it back to
DynamoDB.

# Contents

1. [Installation / Setup](#installation--setup)
1. [Local Development](#local-development)
1. [Testing](#testing)
1. [Encrypting Secrets](#encrypting-secrets)
1. [Deployment](#deployment)
   1. [Staging](#staging)
   1. [Prerelease](#prerelease)
   1. [Production](#production)

## Installation / Setup

Docker needs to be installed (for local DynamoDB). `jq` is also required for
local development.

## Local Development

Best practice is to develop locally using a TDD approach. The boilerplate
includes sample tests on which you can build, including example of how to mock
AWS services.

Start the development environment with:

```sh
yarn dev
```

Try out the webhook with `curl`:

```sh
curl -s \
  -X POST \
  -H "content-type: application/json" \
  -d '{"id":"s1d2f34","foo":"bar"}' \
  http://localhost:3000/webhook | \
  jq
```

## Testing

```sh
yarn test
```

or

```sh
yarn watch:test
```

## Encrypting Secrets

Please see the guide/instructions in the
[Typescript boilerplate](/typescript/#encrypting-secrets).

## Deployment

### Staging

```sh
yarn deploy
```

### Prerelease

```sh
npm version prerelease
```

### Production

```sh
npm version [major|minor|patch]
```
