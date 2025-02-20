import { execSync } from 'child_process'

export function getGitCommitHashLocal() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  } catch {
    return undefined
  }
}

export function getGitBranch() {
  return process.env.GIT_BRANCH ?? process.env.BRANCH ?? getGitCommitHashLocal() ?? ''
}
