import { useRecoilValue } from 'recoil'
import React from 'react'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { clusterDisplayNameToLineagesMapSelector } from 'src/state/Clusters'
import { LineageBadge } from 'src/components/Common/Badges/LineageBadge'
import { VariantBadge } from 'src/components/Common/Badges/VariantBadge'

export function VariantOrLineageBadge({ name, href, prefix, invert }: VariantOrLineageBadgeProps) {
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoLineagesMap = useRecoilValue(clusterDisplayNameToLineagesMapSelector)
  const pangoNames = pangoLineagesMap.get(name)
  const showLineageBadge = enablePangolin != invert

  return showLineageBadge && pangoNames ? (
    <>
      {pangoNames.map((pangoName, idx) => (
        <span key={pangoName}>
          <>{idx > 0 ? <span>, </span> : <span></span>}</>
          <LineageBadge name={pangoName} href={href} />
        </span>
      ))}
    </>
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
