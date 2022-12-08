// Adds additional headers to the response, including security headers and CORS.
// Suited for serving data and APIs.
//
// See also:
//  - https://securityheaders.com/
//
// Usage: Create an AWS Lambda@Edge function and attach it to "Viewer Response"
// event of a Cloudfront distribution

const NEW_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Security-Policy': `default-src 'none'; frame-ancestors 'none'`,
  'Strict-Transport-Security': 'max-age=15768000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-DNS-Prefetch-Control': 'off',
  'X-Download-Options': 'noopen',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
}

function addHeaders(headersObject) {
  return Object.fromEntries(
    Object.entries(headersObject).map(([header, value]) => [header.toLowerCase(), [{ key: header, value }]]),
  )
}

const HEADERS_TO_REMOVE = new Set(['server', 'via'])

function filterHeaders(headers) {
  return Object.entries(headers).reduce((result, [key, value]) => {
    if (HEADERS_TO_REMOVE.has(key.toLowerCase())) {
      return result
    }

    if (key.toLowerCase().includes('powered-by')) {
      return result
    }

    return { ...result, [key.toLowerCase()]: value }
  }, {})
}

function modifyHeaders({ response }) {
  let newHeaders = addHeaders(NEW_HEADERS)

  newHeaders = {
    ...response.headers,
    ...newHeaders,
  }

  newHeaders = filterHeaders(newHeaders)

  return newHeaders
}

exports.handler = (event, context, callback) => {
  const { request, response } = event.Records[0].cf
  response.headers = modifyHeaders({ request, response })
  callback(null, response)
}

exports.modifyHeaders = modifyHeaders
