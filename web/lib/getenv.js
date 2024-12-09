import EnvVarError from './EnvVarError'

function getenv(key, defaultValue) {
  const value = process.env[key]
  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue
    }

    throw new EnvVarError(key, value)
  }
  return value
}

function getbool(key, defaultValue) {
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
