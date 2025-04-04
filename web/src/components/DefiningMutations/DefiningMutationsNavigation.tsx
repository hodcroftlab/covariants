import { useRecoilValue } from 'recoil'
import React, { useCallback, useMemo, useState } from 'react'
import { Button } from 'reactstrap'
import Select from 'react-select'
import { DefiningMutationCluster, DefiningMutationListElement } from 'src/io/getDefiningMutationsClusters'
import { clustersAtom } from 'src/state/Clusters'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { definingMutationClustersAtom, setClusterNameToUrl } from 'src/state/DefiningMutations'

export function DefiningMutationsNavigation({ cluster }: { cluster: DefiningMutationCluster | undefined }) {
  return (
    <div className={`d-flex flex-column gap-2`}>
      <DefiningMutationsSearch />
      <DefiningMutationsVariantQuickSelect cluster={cluster} />
    </div>
  )
}

// Taken from filters.d.ts of react-select, since it is not exported there
interface FilterOptionOption<Option> {
  readonly label: string
  readonly value: string
  readonly data: Option
}

function DefiningMutationsSearch() {
  const { t } = useTranslationSafe()

  const clusters = useRecoilValue(definingMutationClustersAtom)

  const [value] = useState<null | DefiningMutationListElement>(null)

  const formatOptionLabel = useCallback((option: DefiningMutationListElement) => {
    return (
      <div className="d-flex justify-content-between">
        <span>{option.nextstrainClade}</span>
        <span>{option.lineage}</span>
      </div>
    )
  }, [])
  const onSelectChange = useCallback((newValue: DefiningMutationListElement | null) => {
    if (newValue) {
      setClusterNameToUrl(newValue.lineage)
    }
  }, [])

  const filterOption = useCallback((option: FilterOptionOption<DefiningMutationListElement>, input: string) => {
    const inputValue = input.toLowerCase()
    return (
      option.data.lineage.toLowerCase().includes(inputValue) ||
      option.data.nextstrainClade.toLowerCase().includes(inputValue)
    )
  }, [])

  const noOptionsMessage = useCallback(() => t('Could not find clade or lineage.'), [t])

  return (
    <Select
      options={clusters}
      placeholder={t('Search')}
      formatOptionLabel={formatOptionLabel}
      isClearable={true}
      onChange={onSelectChange}
      filterOption={filterOption}
      value={value}
      noOptionsMessage={noOptionsMessage}
    />
  )
}

function DefiningMutationsVariantQuickSelect({
  cluster: currentCluster,
}: {
  cluster: DefiningMutationCluster | undefined
}) {
  const clusters = useRecoilValue(clustersAtom)
  const variants = useMemo(() => clusters.filter((cluster) => cluster.type === 'variant'), [clusters])

  const [showAll, setShowAll] = useState<boolean>(false)
  const { t } = useTranslationSafe()

  const onShowMoreButton = useCallback(() => {
    setShowAll(!showAll)
  }, [showAll])

  const entriesToShowBeforeMoreButton = 10

  return (
    <div>
      <div className={`side-navigation-header mb-2`}>{'Variants'.toUpperCase()}</div>
      <div className="d-flex flex-column gap-1">
        {variants.map((variant, index) => {
          const title = variant.pangoLineages?.at(0)?.name ?? variant.displayName
          const isCurrentCluster = title === currentCluster?.lineage

          if (!showAll && index > entriesToShowBeforeMoreButton && !isCurrentCluster) {
            return null
          }

          return (
            <DefiningMutationVariant
              title={title}
              isCurrentCluster={isCurrentCluster}
              key={`quicklink_${variant.buildName}`}
            />
          )
        })}
      </div>

      <Button onClick={onShowMoreButton} color={'link'}>
        {showAll ? t('Show less') : t('Show more')}
      </Button>
    </div>
  )
}

function DefiningMutationVariant({ isCurrentCluster, title }: { isCurrentCluster: boolean; title: string }) {
  return (
    <a
      className={`btn ${isCurrentCluster ? 'btn-outline-dark' : 'btn-outline-secondary'} text-start`}
      href={`/defining-mutations?variant=${title}`}
    >
      {title}
    </a>
  )
}
