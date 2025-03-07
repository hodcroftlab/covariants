import { useRecoilValue } from 'recoil'
import React from 'react'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { clusterDisplayNameToLineagesMapSelector } from 'src/state/Clusters'

export function VariantOrLineageText({ name, invert }: VariantOrLineageTextProps) {
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoLineagesMap = useRecoilValue(clusterDisplayNameToLineagesMapSelector)
  const pangoNames = pangoLineagesMap.get(name)
  const showLineageBadge = enablePangolin != invert
  return <>{showLineageBadge ? pangoNames?.join(', ') : name}</>
}

export interface VariantOrLineageTextProps {
  name: string
  invert?: boolean
}

/** Shorter convenience alias for VariantOrLineageText*/
export function VarOrLinText({ name, invert = false }: VariantOrLineageTextProps) {
  return <VariantOrLineageText name={name} invert={invert} />
}
