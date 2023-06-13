import React, { useMemo } from 'react'

import dynamic from 'next/dynamic'
import { DEFAULT_LOCALE_KEY } from 'src/i18n/i18n'
import { useRecoilValue } from 'recoil'
import { localeAtom } from 'src/state/locale.state'

export interface MdxContentProps {
  filepath: string
}

export function MdxContent({ filepath }: MdxContentProps) {
  const localeKey = useRecoilValue(localeAtom)
  const Content = useMemo(() => getMdxContent(localeKey, filepath), [filepath, localeKey])
  return <Content />
}

/** Loads Markdown content as react component, given a path relative to `src/content/` directory */
export function getMdxContent(localeKey: string, filepath: string) {
  return dynamic(() => {
    return import(`src/content/${localeKey}/${filepath}`).catch(
      () => import(`src/content/${DEFAULT_LOCALE_KEY}/${filepath}`),
    )
  })
}
