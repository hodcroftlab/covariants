#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
trap "exit" INT

pushd .build/production/web >/dev/null

S3_BUCKET="covariants.org"

if [ "${TRAVIS_BRANCH}" = "master" ]; then
  S3_BUCKET="${S3_BUCKET}-master"
fi

find * -type f -name "*.html" -exec bash -c "\
aws s3 cp --content-type 'text/html' --metadata-directive REPLACE \
s3://${S3_BUCKET}/\$1 \
s3://${S3_BUCKET}/\${1%.html}" \
- '{}' \;

popd >/dev/null
