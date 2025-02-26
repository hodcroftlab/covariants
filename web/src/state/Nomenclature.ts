import { atom } from 'recoil'
import Router from 'next/router'
import { invert } from 'lodash'
import { persistAtom } from 'src/state/persist/localStorage'
import { parseUrl } from 'src/helpers/parseUrl'
import { setUrlPath } from 'src/helpers/urlQuery'
import type { AtomEffectParams } from 'src/state/utils/atomEffect'
import { clusterLineageBuildNameMapSelector } from 'src/state/Clusters'

export const enablePangolinAtom = atom<boolean>({
  key: 'enablePangolin',
  default: false,
  effects: [persistAtom, updateUrlOnPangolinSet],
})

// There might be a more elegant way to sync the url with the nomenclature using recoil-sync: https://recoiljs.org/docs/recoil-sync/url-persistence/
// but it would require corrections in the atom network (new currentCluster atom that can then sync with the url)
export function updateUrlOnPangolinSet({ onSet, getPromise }: AtomEffectParams<boolean>) {
  onSet((enablePangolin) => {
    const { pathname: oldPath } = parseUrl(Router.asPath)
    const [, path, variantName] = oldPath.split('/')

    if (path === 'variants' && variantName !== undefined) {
      getPromise(clusterLineageBuildNameMapSelector)
        .then((lineageToBuildNameMap) => {
          // If nomenclature is changed, pathname will be adjusted to match
          const buildNameToLineageMap = new Map(Object.entries(invert(Object.fromEntries(lineageToBuildNameMap))))
          const newVariantName = enablePangolin
            ? (buildNameToLineageMap.get(variantName) ?? variantName)
            : (lineageToBuildNameMap.get(variantName) ?? variantName)

          return setUrlPath(enablePangolin ? `/${path}/${newVariantName}` : `/${path}/${newVariantName}`)
        })
        .catch((error) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          throw new Error(error)
        })
    }
  })
}
