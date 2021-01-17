import serializeJavascript from 'serialize-javascript'

export function sanitizeError(error: unknown): Error {
  if (!(error instanceof Error)) {
    const str = serializeJavascript(error, { space: 2, ignoreFunction: true })
    return new Error(`developer error: error object is not recognized:
      ${str}
      Make sure all exceptions are derived from \`Error\``)
  }

  return error
}
