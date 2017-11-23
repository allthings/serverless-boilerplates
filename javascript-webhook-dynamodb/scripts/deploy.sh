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

log "Deploying $PROJECT to $STAGE"

log "Deploying Serverless service"

if [ -n "$ROLE" ]; then
  aws-vault exec "$ROLE" -- serverless package -v # @TODO: replace package with deploy
else
  serverless deploy -v # @TODO: replace package with deploy
fi
