#!/bin/sh

#
# Exports deployment configuration as environment variables.
#
# The deployment stage is identified based on the git tag:
# * Untagged commits go to staging.
# * Prerelease tags go to prerelease.
# * Other tags go to production.
# 
# Arguments after the end of options (identified by "--") are executed as
# command, which inherits the exported variables.
#
# Usage: ./deploy-env.sh [-- command args...]
#

set -e

export NODE_ENV=production

# Define AWS IAM deployment role and S3 bucket name:
ROLE="$(jq -r '.config.deployProfile' package.json)"
export ROLE

# Store the current working directory:
CWD="$PWD"

cd "$(dirname "$0")/.."

# Retrieve the project name from the (scoped) package name:
PROJECT="$(jq -r '.name | split("/")[-1]' package.json)"
export PROJECT

if [ -z "${STAGE}" ]; then
  # Retrieve the tag for the current commit:
  TAG="$(git describe --exact-match --tags 2> /dev/null || true)"
  export TAG

  # Restore the working directory:
  cd "$CWD"

  case "$TAG" in
    '')   STAGE=staging;;
    *-*)  STAGE=prerelease;;
    *)    STAGE=production;;
  esac
  export STAGE
fi

# Execute the given command:
if [ "$1" = -- ]; then shift; exec "$@"; fi
