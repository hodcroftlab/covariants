import type { ComponentType } from 'react'

export function getClusterContent(cluster: string) {
  // eslint-disable-next-line global-require,import/no-dynamic-require,security/detect-non-literal-require,@typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-member-access
  return require(`../../../content/clusters/${cluster}.md`).default as ComponentType
}
