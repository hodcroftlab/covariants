import { useRecoilValue } from 'recoil'
import React, { useCallback, useMemo, useState } from 'react'
import { Button } from 'reactstrap'
import Select from 'react-select'
import { DefiningMutationClusterMetaData } from 'src/io/getDefiningMutationsClusters'
import { clustersAtom } from 'src/state/Clusters'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { definingMutationClustersAtom, setClusterNameToUrl } from 'src/state/DefiningMutations'

export function DefiningMutationsNavigation({ cluster }: { cluster: DefiningMutationClusterMetaData | undefined }) {
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

  const [value] = useState<null | DefiningMutationClusterMetaData>(null)

  const formatOptionLabel = useCallback((option: DefiningMutationClusterMetaData) => {
    return (
      <div className="d-flex justify-content-between">
        <span>{option.nextstrainClade}</span>
        <span>{option.pangoLineage}</span>
      </div>
    )
  }, [])
  const onSelectChange = useCallback((newValue: DefiningMutationClusterMetaData | null) => {
    if (newValue) {
      setClusterNameToUrl(newValue.pangoLineage ?? newValue.nextstrainClade ?? undefined)
    }
  }, [])

  const filterOption = useCallback((option: FilterOptionOption<DefiningMutationClusterMetaData>, input: string) => {
    const inputValue = input.toLowerCase()
    return (
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      option.data.pangoLineage?.toLowerCase().includes(inputValue) ||
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
  cluster: DefiningMutationClusterMetaData | undefined
}) {
  const clusters = useRecoilValue(clustersAtom)
  const variants = useMemo(
    () =>
      clusters
        .filter((cluster) => cluster.type === 'variant')
        .filter(
          (cluster, idx, self) =>
            idx === self.findIndex((c) => c.pangoLineages?.at(0)?.name === cluster.pangoLineages?.at(0)?.name),
        ),
    [clusters],
  )

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
          const isCurrentCluster = title === currentCluster?.pangoLineage

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
