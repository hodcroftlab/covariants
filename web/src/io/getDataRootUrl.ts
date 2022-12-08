import { ErrorInternal } from 'src/helpers/ErrorInternal'

export function getDataRootUrl() {
  const DATA_ROOT_URL = process.env.DATA_ROOT_URL // eslint-disable-line prefer-destructuring
  if (!DATA_ROOT_URL) {
    throw new ErrorInternal('The required environment variable DATA_ROOT_URL is not set')
  }
  return DATA_ROOT_URL
}
