import { getenv } from './getenv'

export function getBuildNumber() {
  return getenv('TRAVIS_BUILD_NUMBER', '') ?? getenv('BUILD_ID', '')
}
