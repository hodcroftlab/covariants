import { getBoolOrThrow } from '../../../lib/getenv'
import { getDomain } from '../../../lib/getDomain'

export function getEnvVars() {
  const NODE_ENV = process.env.NODE_ENV
  const ANALYZE = getBoolOrThrow('ANALYZE')
  const PROFILE = getBoolOrThrow('PROFILE')
  const PRODUCTION = NODE_ENV === 'production'
  const DOMAIN = getDomain()
  const DOMAIN_STRIPPED = DOMAIN.replace('https://', '').replace('http://', '')
  const WATCH_POLL = getBoolOrThrow('WATCH_POLL')

  const common = {
    NODE_ENV,
    ANALYZE,
    PROFILE,
    PRODUCTION,
    DOMAIN,
    DOMAIN_STRIPPED,
    WATCH_POLL,
  }

  if (PRODUCTION) {
    return {
      ...common,
      ENABLE_SOURCE_MAPS: getBoolOrThrow('PROD_ENABLE_SOURCE_MAPS'),
      ENABLE_ESLINT: getBoolOrThrow('PROD_ENABLE_ESLINT'),
      ENABLE_TYPE_CHECKS: getBoolOrThrow('PROD_ENABLE_TYPE_CHECKS'),
      ENABLE_STYLELINT: getBoolOrThrow('PROD_ENABLE_STYLELINT'),
    }
  }

  return {
    ...common,
    ENABLE_SOURCE_MAPS: true,
    ENABLE_ESLINT: getBoolOrThrow('DEV_ENABLE_ESLINT'),
    ENABLE_TYPE_CHECKS: getBoolOrThrow('DEV_ENABLE_TYPE_CHECKS'),
    ENABLE_STYLELINT: getBoolOrThrow('DEV_ENABLE_STYLELINT'),
  }
}
