// Implements basic authentication using AWS Lambda@Edge
// This is insecure due to hardcoded credentials and is only suited for blocking crawlers
//
// Usage: Create an AWS Lambda function and attach this to "Viewer Request" event of a Cloudfront distribution

const USERNAME = 'nextstrain'
const PASSWORD = 'nextstrain'
const BASIC_AUTH_STRING = `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')}`

exports.handler = (event, context, callback) => {
  // Get request and request headers
  const request = event.Records[0].cf.request
  const headers = request.headers

  // Require Basic authentication
  if (typeof headers.authorization == 'undefined' || headers.authorization[0].value != BASIC_AUTH_STRING) {
    const body = 'Unauthorized'
    const response = {
      status: '401',
      statusDescription: 'Unauthorized',
      body,
      headers: {
        'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic' }],
      },
    }
    callback(null, response)
  }

  callback(null, request)
}
