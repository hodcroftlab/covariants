import { Row } from 'reactstrap'
import React, { useMemo } from 'react'
import { ColCustom } from 'src/components/Common/ColCustom'
import { useTicks, useTimeDomain } from 'src/io/useParams'
import { CasesPlotCard } from 'src/components/Cases/CasesPlotCard'
import { CountryFlag } from 'src/components/Common/CountryFlag'
import { PerCountryCasesDistribution } from 'src/io/getPerCountryCasesData'

export function CasesComponents({
  withClustersFiltered,
  enabledClusters,
}: {
  withClustersFiltered: PerCountryCasesDistribution[]
  enabledClusters: string[]
}) {
  const timeDomain = useTimeDomain()
  const ticks = useTicks()

  const casesComponents = useMemo(
    () =>
      withClustersFiltered.map(({ country, distribution }) => (
        <ColCustom key={country} md={12} lg={6} xl={6} xxl={4}>
          <CasesPlotCard
            country={country}
            distribution={distribution}
            cluster_names={enabledClusters}
            Icon={CountryFlag}
            ticks={ticks}
            timeDomain={timeDomain}
          />
        </ColCustom>
      )),
    [enabledClusters, withClustersFiltered, ticks, timeDomain],
  )
  return <Row className={'gx-0'}>{casesComponents}</Row>
}
