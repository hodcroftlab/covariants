import EnvVarError from './EnvVarError'

function getenv(key: string, defaultValue?: string | null) {
  const value = process.env[key]
  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue
    }

    throw new EnvVarError(key, value)
  }
  return value
}

function getbool(key: string, defaultValue?: string) {
  const value = process.env[key]
  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue
    }

    throw new EnvVarError(key, value)
  }

  return value === '1' || value === 'true' || value === 'yes'
}

export { getenv, getbool }
