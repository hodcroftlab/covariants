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
        <div>
          {cluster.parent ? (
            <LineageBadge href={`/defining-mutations?variant=${cluster.parent}`} name={cluster.parent} />
          ) : (
            'none'
          )}
        </div>
      </div>
      <div>
        <span>{t('Child lineages')}</span>
        <div className="d-flex flex-wrap gap-1">
          {cluster.children?.map((child) => (
            <LineageBadge href={`/defining-mutations?variant=${child}`} key={child} name={child} />
          ))}
        </div>
      </div>
      <div>
        <span>{t('Designation date')}</span>
        <div>{cluster.designationDate}</div>
      </div>
    </div>
  )
}
