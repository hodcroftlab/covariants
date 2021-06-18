#!/usr/bin/env bash

# Creates CircleCI contexts and sets environment variables in them.
#
# We use one context per branch This nicely separates variables which are
# specific to the build or deployment for that particular branch.
#
# The contexts can be seen in web UI at:
# https://app.circleci.com/settings/organization/github/<organization_name>/contexts
#
# Requirements:
#
#  - Install CircleCI Local CLI: https://circleci.com/docs/2.0/local-cli/
#
#  - Create API token at https://circleci.com/account/api
#
#  - Authenticate the CLI with this token by typing `circleci setup` and
#  following the prompts
#
#  - If you are bootstrapping a new project, set project-specific variables
#  in the script body below to not overwrite someone else's context:
#
#     ```
#     CIRCLECI_VCS=
#     CIRCLECI_ORG=
#     CIRCLECI_PROJECT=
#     CONTEXT_NAME_BASE=
#     ```
#
#  - Put variables called `<branch>_<var_name>` into `.env` file in the project
#  root, and they will be picked up by this script and uploaded into the
#  corresponding contexts. See `.env.example` for the current setup.
#
#  - Remember to not commit sensitive information, such as AWS keys to version
#  control!
#

set -o errexit
set -o pipefail
shopt -s dotglob
trap "exit" INT

THIS_DIR=$(
  cd $(dirname "${BASH_SOURCE[0]}")
  pwd
)

# Put your GITHUB_TOKEN into .env file
[ -f "${THIS_DIR}/../.env.example" ] && source "${THIS_DIR}/../.env.example"
[ -f "${THIS_DIR}/../.env" ] && source "${THIS_DIR}/../.env"

CIRCLECI_VCS=github
CIRCLECI_ORG=hodcroftlab
CIRCLECI_PROJECT=covariants

CONTEXT_NAME_BASE=covariants

BRANCHES=(master release ci)

VAR_NAMES=(
  AWS_ACCESS_KEY_ID
  AWS_SECRET_ACCESS_KEY
  AWS_CLOUDFRONT_DISTRIBUTION_ID
  AWS_S3_BUCKET
  AWS_DEFAULT_REGION
  ENV_NAME
  FULL_DOMAIN
)

# Make all the key-value pairs per branch
for branch in "${BRANCHES[@]}"; do
  for var_name in "${VAR_NAMES[@]}"; do
    var_name_for_branch_key="${branch}_${var_name}"
    declare -n "var_name_for_branch_value=${var_name_for_branch_key}"

    if [ -z "${var_name_for_branch_value}" ]; then
      echo "Error: the required variable ${var_name_for_branch_key} is not set. Refusing to proceed. The configuration is not changed."
      exit 1
    fi

  done
done

for branch in "${BRANCHES[@]}"; do
  CONTEXT_NAME="${CONTEXT_NAME_BASE}_${branch}"

  # Here is how you can delete a context, but you don't need to. Existing context variables are overwritten.
  # circleci context delete "${CIRCLECI_VCS}" "${CIRCLECI_ORG}" "${CONTEXT_NAME}"

  # Create context, ignore "Already exists" error
  circleci context create "${CIRCLECI_VCS}" "${CIRCLECI_ORG}" "${CONTEXT_NAME}" || true

  # Send variables into that context
  for var_name in "${VAR_NAMES[@]}"; do
    var_name_for_branch_key="${branch}_${var_name}"
    declare -n "var_name_for_branch_value=${var_name_for_branch_key}"
    echo $var_name_for_branch_value | tr -d '\n' | circleci context store-secret "${CIRCLECI_VCS}" "${CIRCLECI_ORG}" "${CONTEXT_NAME}" "${var_name}"
  done
done
