#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail
trap "exit" INT

# Removes "<title> should not be used in _document.js" warning.
# Reason: We want title and other SEO tags to be pre-rendered, so that crawlers could find them.
sed -i.bak "s|console.warn(\"Warning: <title> should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-title\");||g" node_modules/next/dist/pages/_document.js
