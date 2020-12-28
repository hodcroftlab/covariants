export function getVersionString() {
  const BRANCH_NAME = process.env.BRANCH_NAME ?? ''
  const PACKAGE_VERSION = process.env.PACKAGE_VERSION ?? ''
  const COMMIT_HASH = process.env.COMMIT_HASH ?? ''
  const BUILD_NUMBER = process.env.BUILD_NUMBER ?? ''

  let version = PACKAGE_VERSION
  let meta: string[] = []
  if (COMMIT_HASH && COMMIT_HASH.length >= 7) {
    meta = [...meta, `commit: ${COMMIT_HASH.slice(0, 7)}`]
  }

  if (BUILD_NUMBER) {
    meta = [...meta, `build: ${BUILD_NUMBER}`]
  }

  if (BRANCH_NAME) {
    meta = [...meta, `branch: ${BRANCH_NAME}`]
  }

  const metaStr = meta.join(', ')
  if (metaStr.length > 0) {
    version = `version ${version} (${metaStr})`
  }

  return version
}
