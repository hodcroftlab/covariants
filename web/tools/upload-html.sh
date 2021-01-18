#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
trap "exit" INT

pushd .build/production/web >/dev/null

find * -type f -name "*.html" -exec bash -c '\
aws s3 cp --content-type "text/html" --metadata-directive REPLACE \
s3://covariants.org-master/$1 \
s3://covariants.org-master/${1%.html}' \
- "{}" \;

popd >/dev/null
