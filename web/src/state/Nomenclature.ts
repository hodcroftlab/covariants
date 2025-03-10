import { atom } from 'recoil'
import Router from 'next/router'
import { invert } from 'lodash'
import { persistAtom } from 'src/state/persist/localStorage'
import { parseUrl } from 'src/helpers/parseUrl'
import { setUrlPath } from 'src/helpers/urlQuery'
import type { AtomEffectParams } from 'src/state/utils/atomEffect'
import { clusterLineageBuildNameMapSelector } from 'src/state/Clusters'
import { VARIANTS } from 'src/constants'

export const enablePangolinAtom = atom<boolean>({
  key: 'enablePangolin',
  default: false,
  effects: [persistAtom, updateUrlOnPangolinSet],
})

export function updateUrlOnPangolinSet({ onSet, getPromise }: AtomEffectParams<boolean>) {
  onSet((enablePangolin) => {
    const { pathname: oldPath } = parseUrl(Router.asPath)
    const [, path, variantName] = oldPath.split('/')

    if (path === VARIANTS && variantName !== undefined) {
      getPromise(clusterLineageBuildNameMapSelector)
        .then((lineageToBuildNameMap) => {
          // If nomenclature is changed, pathname will be adjusted to match
          const buildNameToLineageMap = new Map(Object.entries(invert(Object.fromEntries(lineageToBuildNameMap))))
          const convertedVariantName = enablePangolin
            ? buildNameToLineageMap.get(variantName)
            : lineageToBuildNameMap.get(variantName)
          return convertedVariantName ? setUrlPath(`/${path}/${convertedVariantName}`) : undefined
        })
        .catch((error: Error) => {
          throw error
        })
    }
  })
}
