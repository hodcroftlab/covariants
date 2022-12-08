/* eslint-disable prefer-destructuring */
// Implements rewrite of non-compressed to .gz or .br URLs using AWS
// Lambda@Edge. This is useful if you have precompressed your files.
//
// Usage:
// Create an AWS Lambda function and attach it to "Origin Request" event of a
// Cloudfront distribution

const ARCHIVE_EXTS = ['.7z', '.br', '.bz2', '.gz', '.lzma', '.xz', '.zip', '.zst']

function getHeader(headers, headerName) {
  const header = headers[headerName.toLowerCase()]
  if (!header || !header[0] || !header[0].value) {
    return undefined
  }
  return header[0].value
}

function acceptsEncoding(headers, encoding) {
  const ae = getHeader(headers, 'Accept-Encoding')
  if (!ae || typeof ae != 'string') {
    return false
  }
  return ae.split(',').some((e) => e.trim().toLowerCase().startsWith(encoding.toLowerCase()))
}

function handler(event, context, callback) {
  const request = event.Records[0].cf.request
  const headers = request.headers

  // If not an archive file (which are not precompressed), rewrite the URL to
  // get the corresponding .gz file
  if (ARCHIVE_EXTS.every((ext) => !request.uri.endsWith(ext))) {
    if (acceptsEncoding(headers, 'br')) {
      request.uri += '.br'
    } else if (acceptsEncoding(headers, 'gzip')) {
      request.uri += '.gz'
    }
  }

  callback(null, request)
}

exports.handler = handler
