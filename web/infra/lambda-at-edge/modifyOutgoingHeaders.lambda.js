// Adds some of the security headers to requests using AWS Lambda@Edge
// See https://securityheaders.com/
//
// Usage: Create an AWS Lambda function and attach this to "Viewer Response" event of a Cloudfront distribution

const FEATURE_POLICY = {
  'accelerometer': `'none'`,
  'autoplay': `'none'`,
  'camera': `'none'`,
  'document-domain': `'none'`,
  'encrypted-media': `'none'`,
  'fullscreen': `'none'`,
  'geolocation': `'none'`,
  'gyroscope': `'none'`,
  'magnetometer': `'none'`,
  'microphone': `'none'`,
  'midi': `'none'`,
  'payment': `'none'`,
  'picture-in-picture': `'none'`,
  'sync-xhr': `'none'`,
  'usb': `'none'`,
  'xr-spatial-tracking': `'none'`,
}

function generateFeaturePolicyHeader(featurePolicyObject) {
  return Object.entries(featurePolicyObject)
    .map(([policy, value]) => `${policy} ${value}`)
    .join('; ')
}

const NEW_HEADERS = {
  'Content-Security-Policy':
    "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src *; frame-src https://nextstrain.org",
  'Referrer-Policy': 'no-referrer',
  'Strict-Transport-Security': 'max-age=15768000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-DNS-Prefetch-Control': 'off',
  'X-Download-Options': 'noopen',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Feature-Policy': generateFeaturePolicyHeader(FEATURE_POLICY),
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

function modifyHeaders({ request, response }) {
  let newHeaders = addHeaders(NEW_HEADERS)

  newHeaders = {
    ...response.headers,
    ...newHeaders,
  }

  newHeaders = filterHeaders(newHeaders)

  const url = request.uri || request.url
  if (url.startsWith('/_next')) {
    const cacheHeaders = addHeaders({
      'Cache-Control': 'public,max-age=31536000,immutable',
    })

    newHeaders = {
      ...newHeaders,
      ...cacheHeaders,
    }
  }

  return newHeaders
}

exports.handler = (event, context, callback) => {
  const { request, response } = event.Records[0].cf
  response.headers = modifyHeaders({ request, response })
  callback(null, response)
}

exports.modifyHeaders = modifyHeaders
