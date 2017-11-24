# JS Webhook DynamoDB Allthings API Boilerplate

```
Invoked via API Gateway (as a webhook)
  -> json request body
    -> invoke lambda
      -> write/retrieve something from dynamo db
        -> manipulate
          -> write/retrieve data external API
            -> write to dynamodb
              -> oauth
                -> call allthings-api
```

## Installation / Setup

You need Docker (for local DynamoDB)

## Local Development

```sh
yarn dev
```

Test it:

```sh
curl -s \
  -X POST \
  -H "content-type: application/json" \
  -d '{"id":"s1d2f34","foo":"bar"}' \
  http://localhost:3000/webhook | \
  jq
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
