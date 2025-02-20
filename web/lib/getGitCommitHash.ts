import { execSync } from 'child_process'

export function getGitCommitHashLocal() {
  try {
    return execSync('git rev-parse HEAD').toString().trim()
  } catch {
    return undefined
  }
}

export function getGitCommitHash() {
  return (
    process.env.GIT_COMMIT ??
    process.env.GIT_COMMIT_HASH ??
    process.env.GITHUB_SHA ??
    process.env.COMMIT_REF ??
    getGitCommitHashLocal() ??
    ''
  )
}
