import { Row } from 'reactstrap'
import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { ColCustom } from 'src/components/Common/ColCustom'
import { CasesPlotCard } from 'src/components/Cases/CasesPlotCard'
import { CountryFlag } from 'src/components/Common/CountryFlag'
import { filterClusters, filterCountries } from 'src/io/getPerCountryCasesData'
import { Cluster } from 'src/state/Clusters'
import { Country } from 'src/state/Places'
import { perCountryCasesDataSelector } from 'src/state/PerCountryCasesData'

export function CasesComponents({ clusters, countries }: { clusters: Cluster[]; countries: Country[] }) {
  const { perCountryCasesDistributions } = useRecoilValue(perCountryCasesDataSelector)

  const { enabledClusters, withClustersFiltered } = useMemo(() => {
    const { withCountriesFiltered } = filterCountries(countries, perCountryCasesDistributions)
    return filterClusters(clusters, withCountriesFiltered)
  }, [countries, perCountryCasesDistributions, clusters])

  const casesComponents = useMemo(
    () =>
      withClustersFiltered.map(({ country, distribution }) => (
        <ColCustom key={country} md={12} lg={6} xl={6} xxl={4}>
          <CasesPlotCard
            country={country}
            distribution={distribution}
            cluster_names={enabledClusters}
            Icon={CountryFlag}
          />
        </ColCustom>
      )),
    [enabledClusters, withClustersFiltered],
  )
  return <Row className={'gx-0'}>{casesComponents}</Row>
}
