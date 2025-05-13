import React from 'react'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { DefiningMutationCluster } from 'src/io/getDefiningMutationsClusters'
import { LineageBadge } from 'src/components/Common/Badges/LineageBadge'

export function DefiningMutationsInfo({ cluster }: { cluster: DefiningMutationCluster }) {
  const { t } = useTranslationSafe()

  return (
    <div className={`d-flex flex-column gap-2`}>
      <div>
        <span>{t('Parent lineage')}</span>
        <ParentLineageBadge parentLineage={cluster.parent} />
      </div>
      <div>
        <span>{t('Child lineages')}</span>
        <ChildLineageBadges childLineages={cluster.children} />
      </div>
      <div>
        <span>{t('Designation date')}</span>
        <div>{cluster.designationDate}</div>
      </div>
    </div>
  )
}

function ParentLineageBadge({ parentLineage }: { parentLineage?: string }) {
  if (parentLineage === undefined) {
    return <div>none</div>
  }

  return (
    <div>
      <LineageBadge href={`/defining-mutations?variant=${parentLineage}`} name={parentLineage} />
    </div>
  )
}

function ChildLineageBadges({ childLineages }: { childLineages?: string[] }) {
  if (childLineages === undefined) {
    return <div>none</div>
  }

  return (
    <div className="d-flex flex-wrap gap-1">
      {childLineages.map((child) => (
        <LineageBadge href={`/defining-mutations?variant=${child}`} key={child} name={child} />
      ))}
    </div>
  )
}
