import React from 'react'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { DefiningMutationListElement } from 'src/io/getDefiningMutationsClusters'
import { LineageBadge } from 'src/components/Common/Badges/LineageBadge'
import { VariantBadge } from 'src/components/Common/Badges/VariantBadge'

export function DefiningMutationsInfo({ cluster }: { cluster: DefiningMutationListElement }) {
  const isClade = cluster?.nextstrainParent ?? cluster?.nextstrainChildren

  return (
    <div className={`d-flex flex-column gap-3`}>
      {isClade && <NextstrainInfo cluster={cluster} />}
      {cluster?.pangoLineage && <PangoInfo cluster={cluster} />}
    </div>
  )
}

function NextstrainInfo({ cluster }: { cluster: DefiningMutationListElement }) {
  const { t } = useTranslationSafe()
  return (
    <div className={`d-flex flex-column gap-2`}>
      <h5 className={'mb-0'}>{t('Nextstrain')}</h5>
      <div>
        <span>{t('Parent clade')}</span>
        <ParentCladeBadge parentClade={cluster.nextstrainParent ?? undefined} />
      </div>
      <div>
        <span>{t('Child clades')}</span>
        <ChildCladeBadges childClades={cluster.nextstrainChildren ?? undefined} />
      </div>
    </div>
  )
}

function PangoInfo({ cluster }: { cluster: DefiningMutationListElement }) {
  const { t } = useTranslationSafe()
  return (
    <div className={`d-flex flex-column gap-2`}>
      <h5 className={'mb-0'}>{t('Pango')}</h5>
      <div>
        <span>{t('Parent lineage')}</span>
        <ParentLineageBadge parentLineage={cluster.pangoParent ?? undefined} />
      </div>
      <div>
        <span>{t('Child lineages')}</span>
        <ChildLineageBadges childLineages={cluster.pangoChildren ?? undefined} />
      </div>
      <div>
        <span>{t('Designation date')}</span>
        <div>{cluster.designationDate ?? 'none'}</div>
      </div>
    </div>
  )
}

function ParentCladeBadge({ parentClade }: { parentClade?: string }) {
  if (parentClade === undefined) {
    return <div>none</div>
  }

  return (
    <div>
      <VariantBadge href={`/defining-mutations?variant=${parentClade}`} name={parentClade} />
    </div>
  )
}

function ChildCladeBadges({ childClades }: { childClades?: string[] }) {
  if (childClades === undefined || childClades.length === 0) {
    return <div>none</div>
  }

  return (
    <div className="d-flex flex-wrap gap-1">
      {childClades.map((child) => (
        <VariantBadge href={`/defining-mutations?variant=${child}`} key={child} name={child} />
      ))}
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
  if (childLineages === undefined || childLineages.length === 0) {
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
