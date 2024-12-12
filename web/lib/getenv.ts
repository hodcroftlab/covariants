import EnvVarError from './EnvVarError'

function getEnvOrThrow(key: string) {
  const value = process.env[key]
  if (value === undefined) {
    throw new EnvVarError(key, value)
  }
  return value
}

function getBoolOrThrow(key: string) {
  const value = process.env[key]
  if (value === undefined) {
    throw new EnvVarError(key, value)
  }

  return value === '1' || value === 'true' || value === 'yes'
}

export { getBoolOrThrow, getEnvOrThrow }
