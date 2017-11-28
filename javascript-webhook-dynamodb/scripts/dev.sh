#!/bin/sh

#
# Runs development environment
#

set -e

cd "$(dirname "$0")/../"

PROJECT_NAME=$(jq -r '.name' package.json)

DOCKER_IMAGE="adieuadieu/dynamodb"
DOCKER_CONTAINER="dynamodb"

DDB_DATA_PATH="$PWD/.dynamodb"
DDB_ENDPOINT_URL="http://localhost:8000"
DDB_TABLE_NAME="$PROJECT_NAME-things"
DDB_CLEANUP=true

export AWS_REGION=local
export AWS_ACCESS_KEY_ID=foobar-key
export AWS_SECRET_ACCESS_KEY=foobar-secret
export STAGE="development"

cleanup() {
  if [ -n "$DDB_CLEANUP" ]; then
    echo "Deleting local DynamoDB table: $DDB_TABLE_NAME"
    aws dynamodb delete-table \
      --endpoint-url "$DDB_ENDPOINT_URL" \
      --table-name "$DDB_TABLE_NAME"
  fi

  kill "$SERVE"
  kill "$CONTAINER"
}

echo "Starting $PROJECT_NAME in $STAGE stage.."

mkdir -p "$DDB_DATA_PATH"

docker run \
  --rm \
  --name "$DOCKER_CONTAINER" \
  -v "$DDB_DATA_PATH":/data \
  -p 8000:8000 \
  "$DOCKER_IMAGE" \
  -dbPath /data \
  -sharedDb &
CONTAINER=$!

yarn dev:offline &
SERVE=$!

DDB_TABLES=$(aws dynamodb list-tables \
  --endpoint-url "$DDB_ENDPOINT_URL" | \
  jq -e '.TableNames | length ' \
)

if [ "$DDB_TABLES" -eq 0 ]; then
  echo "Creating local DynamoDB table: $DDB_TABLE_NAME"

  aws dynamodb create-table \
  --endpoint-url "$DDB_ENDPOINT_URL" \
  --table-name "$DDB_TABLE_NAME" \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 | \
  jq
fi

trap cleanup INT TERM

wait


