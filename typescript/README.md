# Typescript Serverless Boilerplate

Typescript boilerplate AWS Lambda service which is invoked via API Gateway.

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

```sh
yarn install
```

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

## Encrypting Secrets

In production, encrypt sensitive environment variables or other secret strings with KMS:

```sh
yarn encrypt-string "super secret string"
```

To decrypt cyphertext, use the `kmsDecrypt()` utility in `~/src/utils/kms.ts`. Base64 encoded
strings passed to `kmsDecrypt()` will get decrypted while strings which are not base64 encoded (and
therefore likely not encrypted) will simply be returned as-is from `kmsDecrypt()`. `kmsDecrypt()`
also accepts an array of strings, which are decrypted in parallel. To improve performance across
Lambda invocations, decrypted strings are cached for you. To decrypt cyphertext, in your code:

```typescript
import handler from 'alagarr'
import kmsDecrypt from './utils/kms'

if (FOR_EXAMPLE_IN_DEVELOPMENT) {
  const SUPER_SECRET = 'super secret string, unencrypted'
} else if (FOR_EXAMPLE_IN_PRODUCTION) {
  const SUPER_SECRET = 'AQECAHj6Y8swFFZ8sg2A5LDTngYQ4IY...YtXTBbxtG0Z0wAQG7HuQ=='
}

export default handler(async (request: any, response: any) => {
  const SUPER_SECRET_DECRYPTED = await kmsDecrypt(SUPER_SECRET) // result gets cached :-)
  const { body } = request

  // Do something useful with SUPER_SECRET_DECRYPTED,
  // ...like connect to a database

  return response.json({ message: 'Hi.', body })
})
```

To deploy secrets as part of an environment variable, add it to `serverless.yml` like so:

```yaml
service:
  name: ${self:custom.package.name}
  awsKmsKeyArn: ${self:custom.package.name.awsKmsKeyArn} # use a custom kms key, defined in package.json

provider:
  name: aws
  environment:
    SUPER_SECRET: AQECAHj6Y8swFFZ8sg2A5LDTngYQ4IY...YtXTBbxtG0Z0wAQG7HuQ==
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
