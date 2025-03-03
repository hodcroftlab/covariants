import { useRecoilValue } from 'recoil'
import React, { useMemo } from 'react'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { clusterNamesSelector, clusterPangoLineageMapSelector, clustersAtom } from 'src/state/Clusters'
import { LineageBadge } from 'src/components/Common/Badges/LineageBadge'
import { formatVariantUrl, VariantBadge, variantToObjectAndString } from 'src/components/Common/Badges/VariantBadge'

export function VariantOrLineageBadge({ name, href, prefix, invert }: VariantOrLineageBadgeProps) {
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoLineageMap = useRecoilValue(clusterPangoLineageMapSelector)
  const pangoName = pangoLineageMap.get(name)
  const showLineageBadge = enablePangolin != invert

  const clusters = useRecoilValue(clustersAtom)
  const clusterNames = useRecoilValue(clusterNamesSelector)
  const { mutationStr } = useMemo(() => {
    return variantToObjectAndString(name)
  }, [name])
  const url = useMemo(
    () => href ?? formatVariantUrl(clusters, clusterNames, mutationStr),
    [href, mutationStr, clusters, clusterNames],
  )
  return showLineageBadge && pangoName ? (
    <LineageBadge name={pangoName} href={url} />
  ) : (
    <VariantBadge name={name} href={url} prefix={prefix} />
  )
}

export interface VariantOrLineageBadgeProps {
  name: string
  href?: string
  prefix?: string
  invert?: boolean
}

/** Shorter convenience alias for VariantOrLineageLinkBadge*/
export function VarOrLin({ name, href, prefix, invert = false }: VariantOrLineageBadgeProps) {
  return <VariantOrLineageBadge name={name} href={href} prefix={prefix} invert={invert} />
}
