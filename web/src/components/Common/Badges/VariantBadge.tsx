import { useRecoilValue } from 'recoil'
import React, { useMemo } from 'react'
import type { Mutation } from 'src/types'
import { clusterNamesSelector, clustersAtom } from 'src/state/Clusters'
import { AMINOACID_COLORS } from 'src/colors'
import { MutationBadge } from 'src/components/Common/Badges/MutationBadge'
import { ClusterDatum } from 'src/io/getClusters'
import { parseVariant } from 'src/components/Common/parseVariant'
import { formatMutation } from 'src/components/Common/formatMutation'
import { LinkUnstyled } from 'src/components/Common/Badges/LineageBadge'

export function VariantBadge({ name, href, prefix }: VariantLinkProps) {
  const clusters = useRecoilValue(clustersAtom)
  const clusterNames = useRecoilValue(clusterNamesSelector)
  const { mutationObj, mutationStr } = useMemo(() => variantToObjectAndString(name), [name])
  const url = useMemo(
    () => href ?? formatVariantUrl(clusters, clusterNames, mutationStr),
    [href, mutationStr, clusters, clusterNames],
  )

  if (!mutationObj) {
    return <span className="text-danger">{`VariantLinkBadge: Invalid mutation: ${JSON.stringify(name)}`}</span>
  }

  if (!url) {
    return (
      <span className="text-danger">
        <span>VariantLinkBadge: Variant not recognized: {JSON.stringify(name)}.</span>
        <span>Known variants: {clusterNames.join(', ')}</span>
      </span>
    )
  }

  return (
    <LinkUnstyled href={url} icon={null}>
      <MutationBadge prefix={prefix} mutation={mutationObj} colors={AMINOACID_COLORS} />
    </LinkUnstyled>
  )
}

export interface VariantLinkProps {
  name: Mutation | string
  href?: string
  prefix?: string
}

export function formatVariantUrl(clusters: ClusterDatum[], clusterNames: string[], mutation: string) {
  const cluster = clusters.find(({ displayName }) => displayName === mutation)
  if (!cluster) {
    console.warn(`Variant not recognized: ${mutation}. Known variants: ${clusterNames.join(', ')}`)
    return undefined
  }

  return `/variants/${cluster.buildName}`
}

export function variantToObjectAndString(mutation: Mutation | string) {
  let mutationObj: Mutation | undefined
  let mutationStr: string | undefined

  if (typeof mutation === 'string') {
    mutationObj = parseVariant(mutation)
    mutationStr = mutation
  } else {
    mutationObj = mutation
    mutationStr = formatMutation(mutation)
  }

  return { mutationObj, mutationStr }
}

/** Shorter convenience alias for VariantLinkBadge */
export function Var({ name, href, prefix = 'Variant' }: { name: string; href?: string; prefix?: string }) {
  return <VariantBadge name={name} href={href} prefix={prefix} />
}

/** Shorter convenience alias for VariantLinkBadge */
export function Mut({ name, href, prefix = 'Mutation' }: { name: string; href?: string; prefix?: string }) {
  return <VariantBadge name={name} href={href} prefix={prefix} />
}
