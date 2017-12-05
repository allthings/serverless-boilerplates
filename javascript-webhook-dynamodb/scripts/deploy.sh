#!/bin/sh

#
# Deploys the the project to AWS
#
# Usage: ./deploy.sh
#

set -e

cd "$(dirname "$0")/.."

# Source the deployment configuration:
# shellcheck disable=SC1091
. scripts/deploy-env.sh --

log() {
  background=$(tput setab 1)
  bold=$(tput bold)
  normal=$(tput sgr0)
  white=$(tput setaf 7)
  uncolor='\033[0m'

  echo "${background}${bold}  --- ${white}${1} ---  ${uncolor}${normal}"
}

# Check node_modules integrity
yarn check --integrity

# Iterate over the dependency requirements:
while IFS= read -r REQUIREMENT; do
  # Skip empty lines and lines starting with a hash (#):
  [ -z "$REQUIREMENT" ] || [ "${REQUIREMENT#\#}" != "$REQUIREMENT" ] && continue
  if ! command -v "$REQUIREMENT" > /dev/null 2>&1; then
    echo "\"$REQUIREMENT\" is not available in PATH" >&2
    echo "Please install \"$REQUIREMENT\" (or try yarn install)" >&2
    exit 1
  fi
done << EOL
serverless
EOL

log "Deploying $PROJECT to $STAGE"

log "Deploying Serverless service"

if [ -n "$ROLE" ]; then
  aws-vault exec "$ROLE" -- serverless deploy -v
else
  serverless deploy -v
fi
