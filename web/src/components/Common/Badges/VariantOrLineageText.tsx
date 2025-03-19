import { useRecoilValue } from 'recoil'
import React from 'react'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { clusterDisplayNameToJoinedLineagesSelector } from 'src/state/Clusters'

export function VariantOrLineageText({ name, invert }: VariantOrLineageTextProps) {
  const enablePangolin = useRecoilValue(enablePangolinAtom)
  const pangoName = useRecoilValue(clusterDisplayNameToJoinedLineagesSelector(name)) ?? name
  const showLineageBadge = enablePangolin != invert
  return <>{showLineageBadge ? pangoName : name}</>
}

export interface VariantOrLineageTextProps {
  name: string
  invert?: boolean
}

/** Shorter convenience alias for VariantOrLineageText*/
export function VarOrLinText({ name, invert = false }: VariantOrLineageTextProps) {
  return <VariantOrLineageText name={name} invert={invert} />
}
