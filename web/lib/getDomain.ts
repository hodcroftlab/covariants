import isInteractive from 'is-interactive'

import { getEnvOrThrow } from './getenv'

const WEB_PORT_DEV = process.env.WEB_PORT_DEV ?? ''
const WEB_PORT_PROD = process.env.WEB_PORT_PROD ?? ''
const devDomain = `http://localhost:${WEB_PORT_DEV}`
const prodDomain = `http://localhost:${WEB_PORT_PROD}`

const ENV_VARS = [
  // prettier-ignore
  'VERCEL_URL',
  'DEPLOY_PRIME_URL',
  'DEPLOY_URL',
  'URL',
]

export function getenvFirst(vars: string[]) {
  return vars.map((v) => process.env[v]).find((v) => v !== undefined)
}

export function listEnvVars(vars: string[]) {
  return vars.map((v) => `\n   - ${v}=${process.env[v] ?? ''}`).join('')
}

export function devError() {
  // prettier-ignore
  return `Developer error: environment variable "FULL_DOMAIN" was set to "autodetect", but automatic domain detection failed.

  If you build on your local computer, make sure you are running \`yarn dev\` or \`yarn prod:watch\` from an interactive terminal session. In this case the domain will be set to localhost.

  If this is a CI build, here is the list of the environment variables where domain name is being looked for (in this order) along with their current values: ${listEnvVars(ENV_VARS)}

  Make sure that this list is correct, that it includes the specific variable for this particular CI server and that the CI server really sets the variable to domain name.

  In all cases, you can bypass the automatic domain detection by explicitly defining environment variable \`FULL_DOMAIN\`
`
}

export function getDomain() {
  let DOMAIN = getEnvOrThrow('FULL_DOMAIN')

  if (DOMAIN === 'autodetect') {
    const interactive = isInteractive()

    if (interactive && process.env.NODE_ENV === 'development') {
      return devDomain
    }

    if (interactive && process.env.NODE_ENV === 'production') {
      return prodDomain
    }

    const detectedDomain = getenvFirst(ENV_VARS)

    if (!detectedDomain) {
      throw new Error(devError())
    }

    DOMAIN = detectedDomain
  }

  if (!DOMAIN.startsWith('http')) {
    DOMAIN = `https://${DOMAIN}`
  }

  return DOMAIN
}
