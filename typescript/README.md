# Typescript Serverless Boilerplate

Typescript boilerplate AWS Lambda service which is invoked via API Gateway.

# Contents

1. [Installation / Setup](#installation--setup)
1. [Local Development](#local-development)
1. [Testing](#testing)
1. [Deployment](#deployment)
   1. [Staging](#staging)
   1. [Prerelease](#prerelease)
   1. [Production](#production)

## Installation / Setup

Docker needs to be installed (for local DynamoDB). `jq` is also required for local development.

## Local Development

Best practice is to develop locally using a TDD approach. The boilerplate includes sample tests on
which you can build, including example of how to mock AWS services.

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
