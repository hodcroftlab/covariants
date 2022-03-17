import { getbool, getenv } from '../../../lib/getenv'
import { getDomain } from '../../../lib/getDomain'

export function getEnvVars() {
  const BABEL_ENV = getenv('BABEL_ENV')
  const NODE_ENV = getenv('NODE_ENV')
  const ANALYZE = getbool('ANALYZE')
  const PROFILE = getbool('PROFILE')
  const PRODUCTION = NODE_ENV === 'production'
  const DOMAIN = getDomain()
  const DOMAIN_STRIPPED = DOMAIN.replace('https://', '').replace('http://', '')
  const WATCH_POLL = getbool('WATCH_POLL', false)

  const common = {
    BABEL_ENV,
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
      ENABLE_SOURCE_MAPS: getbool('PROD_ENABLE_SOURCE_MAPS'),
      ENABLE_ESLINT: getbool('PROD_ENABLE_ESLINT'),
      ENABLE_TYPE_CHECKS: getbool('PROD_ENABLE_TYPE_CHECKS'),
      ENABLE_STYLELINT: getbool('PROD_ENABLE_STYLELINT'),
    }
  }

  return {
    ...common,
    ENABLE_SOURCE_MAPS: true,
    ENABLE_ESLINT: getbool('DEV_ENABLE_ESLINT'),
    ENABLE_TYPE_CHECKS: getbool('DEV_ENABLE_TYPE_CHECKS'),
    ENABLE_STYLELINT: getbool('DEV_ENABLE_STYLELINT'),
  }
}
