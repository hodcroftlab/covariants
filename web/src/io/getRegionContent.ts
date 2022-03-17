import type { ComponentType } from 'react'

export function getRegionPerCountryContent(regionContent: string) {
  // eslint-disable-next-line global-require,import/no-dynamic-require,security/detect-non-literal-require,@typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-member-access,unicorn/prefer-module
  return require(`../../../content/PerCountryIntro/${regionContent}`).default as ComponentType
}
