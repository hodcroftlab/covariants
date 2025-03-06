import { useRecoilValue } from 'recoil'
import React from 'react'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { clusterPangoLineageMapSelector } from 'src/state/Clusters'
import { LineageBadge } from 'src/components/Common/Badges/LineageBadge'
import { VariantBadge } from 'src/components/Common/Badges/VariantBadge'

export function VariantOrLineageBadge({ name, href, prefix, invert }: VariantOrLineageBadgeProps) {
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoLineageMap = useRecoilValue(clusterPangoLineageMapSelector)
  const pangoName = pangoLineageMap.get(name)
  const showLineageBadge = enablePangolin != invert

  return showLineageBadge && pangoName ? (
    <LineageBadge name={pangoName} href={href} />
  ) : (
    <VariantBadge name={name} href={href} prefix={prefix} />
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
