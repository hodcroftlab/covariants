import { getbool, getenv } from '../../../lib/getenv'
import { getDomain } from '../../../lib/getDomain'

export function getEnvVars() {
  const NODE_ENV = getenv('NODE_ENV')
  const PRODUCTION = NODE_ENV === 'production'
  const PROFILE = getbool('PROFILE')
  const DOMAIN = getDomain()
  const DOMAIN_STRIPPED = DOMAIN.replace('https://', '').replace('http://', '')
  const WATCH_POLL = getbool('WATCH_POLL', false)

  const common = {
    NODE_ENV,
    PRODUCTION,
    PROFILE,
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
    }
  }

  return {
    ...common,
    ENABLE_SOURCE_MAPS: true,
    ENABLE_ESLINT: getbool('DEV_ENABLE_ESLINT'),
    ENABLE_TYPE_CHECKS: getbool('DEV_ENABLE_TYPE_CHECKS'),
  }
}
