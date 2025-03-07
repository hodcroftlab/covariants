import { get as getLodash } from 'lodash'
import Router from 'next/router'
import { atom, selector } from 'recoil'
import { persistAtom } from 'src/state/persist/localStorage'
import { parseUrl } from 'src/helpers/parseUrl'
import { setUrlPath, updateUrlQuery } from 'src/helpers/urlQuery'
import type { AtomEffectParams } from 'src/state/utils/atomEffect'
import { CASES, VARIANTS } from 'src/constants'
import {
  clusterLineagesToBuildNameMapSelector,
  clusterLineagesToDisplayNameMapSelector,
  clusterDisplayNameToLineageMapSelector,
  clusterBuildNameToLineageMapSelector,
} from 'src/state/Clusters'
import { clustersCasesAtom } from 'src/state/ClustersForCaseData'
import { convertToArrayMaybe } from 'src/helpers/array'
import { atomDefault } from 'src/state/utils/atomDefault'

/** This is a writeable "facade-selector" for two "sub-atoms" to allow getting the nomenclature from the url on page load
 * while still allowing a change in the nomenclature state to update the url later.
 *
 * Initially, the value is taken from the url (if its query parameters contain variants), potentially overruling the value
 * of the "stored sub-atom" persisted in the browser.
 *
 * Whenever the selector is set (e.g. by hitting the nomenclature toggle), the two "sub-atoms" are aligned and
 * the "url sub-atom" updates the url according to the selected nomenclature via a side effect.
 *
 * There might be a more elegant way to sync the url with the nomenclature using recoil-sync: https://recoiljs.org/docs/recoil-sync/url-persistence/
 * but it looked a bit too rigid to me for the complex case we have here.
 * **/
export const enablePangolinAtom = selector({
  key: 'enablePangolin',
  get: ({ get }) => {
    return get(urlEnablePangolinAtom) ?? get(storedEnablePangolinAtom)
  },
  set: ({ set }, newValue) => {
    set(urlEnablePangolinAtom, newValue)
    set(storedEnablePangolinAtom, newValue)
  },
})

export const storedEnablePangolinAtom = atom<boolean>({
  key: 'storedEnablePangolin',
  default: false,
  effects: [persistAtom],
})

export const urlEnablePangolinAtom = atomDefault<boolean | undefined>({
  key: 'urlEnablePangolin',
  default: ({ get }) => {
    const { query } = parseUrl(Router.asPath)
    const variants = convertToArrayMaybe(getLodash(query, 'variant'))

    if (variants) {
      const lineageMap = get(clusterDisplayNameToLineageMapSelector)
      const displayNameMap = get(clusterLineagesToDisplayNameMapSelector)

      const { enablePangolin, newQuery } = extractNomenclatureAndQuery(variants, lineageMap, displayNameMap)

      if (newQuery.sort() !== variants.sort()) {
        void updateUrlQuery({ variant: newQuery })
      }

      return enablePangolin
    }

    return undefined
  },
  effects: [updateUrlOnSetPangolin],
})

function extractNomenclatureAndQuery(
  variants: string[],
  lineageMap: Map<string, string>,
  displayNameMap: Map<string, string>,
) {
  const lineageNames = variants.filter((variant) => displayNameMap.has(variant))
  const displayNames = variants.filter((variant) => lineageMap.has(variant))
  const enablePangolin = lineageNames.length > displayNames.length // arbitrarily chose the nomenclature that has more query parameters

  let newQuery
  if (enablePangolin) {
    const convertedLineageVariants = variants
      .map((lineageOrDisplayName) => lineageMap.get(lineageOrDisplayName))
      .filter((lineage) => lineage !== undefined)
    newQuery = lineageNames.concat(convertedLineageVariants)
  } else {
    const convertedDisplayNameVariants = variants
      .map((lineageOrDisplayName) => displayNameMap.get(lineageOrDisplayName))
      .filter((displayName) => displayName !== undefined)

    newQuery = displayNames.concat(convertedDisplayNameVariants)
  }

  return { enablePangolin, newQuery }
}

export function updateUrlOnSetPangolin({ onSet, getPromise }: AtomEffectParams<boolean | undefined>) {
  onSet((enablePangolin) => {
    const { pathname: oldPath } = parseUrl(Router.asPath)
    const [, path, ...variantNameFragments] = oldPath.split('/')
    const variantName = variantNameFragments.join('/')

    if (path === VARIANTS && variantName !== undefined) {
      Promise.all([getPromise(clusterBuildNameToLineageMapSelector), getPromise(clusterLineagesToBuildNameMapSelector)])
        .then(([buildNameToLineageMap, lineageToBuildNameMap]) => {
          // If nomenclature is changed, pathname will be adjusted to match
          const convertedVariantName = enablePangolin
            ? buildNameToLineageMap.get(variantName)
            : lineageToBuildNameMap.get(variantName)
          return convertedVariantName ? setUrlPath(`/${path}/${convertedVariantName}`) : undefined
        })
        .catch((error: Error) => {
          throw error
        })
    }

    if (path === CASES) {
      // If all clusters are enabled, we will remove cluster url params
      Promise.all([getPromise(clustersCasesAtom), getPromise(clusterDisplayNameToLineageMapSelector)])
        .then(([clusters, lineageMap]) => {
          const hasAllEnabled = clusters.every((cluster) => cluster.enabled)
          const variants = hasAllEnabled
            ? []
            : clusters.filter((cluster) => cluster.enabled).map((cluster) => cluster.cluster)

          return updateUrlQuery({
            variant: enablePangolin
              ? variants.map((displayName) => lineageMap.get(displayName) ?? displayName)
              : variants,
          })
        })
        .catch((error) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          throw new Error(error)
        })
    }
  })
}
