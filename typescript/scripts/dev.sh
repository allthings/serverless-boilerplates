#!/bin/sh

#
# Runs development environment
#

set -e

cd "$(dirname "$0")/../"

PROJECT_NAME=$(jq -r '.name' package.json)

export AWS_REGION=local
export AWS_ACCESS_KEY_ID=foobar-key
export AWS_SECRET_ACCESS_KEY=foobar-secret
export STAGE="development"

cleanup() {
  kill "$SERVE"
}

echo "Starting $PROJECT_NAME in $STAGE stage.."

yarn dev:offline &
SERVE=$!

trap cleanup INT TERM

wait


