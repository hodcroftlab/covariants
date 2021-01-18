#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
trap "exit" INT

find .build/production/web -name "*.html" -exec bash -c 'cp "$1" "${1%.html}"' - '{}' \;
