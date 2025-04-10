import axios from 'axios'
import React, { useMemo } from 'react'

import get from 'lodash/get'
import { Oval as OvalLoader } from 'react-loader-spinner'
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import AcknowledgementsContent from './AcknowledgementsContent.md'
import { AcknowledgementsError } from 'src/components/Acknowledgements/AcknowledgementsError'
import { AcknowledgementsCard, AcknowledgementsKeysJson } from 'src/components/Acknowledgements/AcknowledgementsCard'
import { hasPageClustersSelector } from 'src/state/Clusters'

export function Acknowledgements() {
  const { isLoading, isFetching, isError, data, error } = useQueryAcknowledgementsKeys()

  const body = useMemo(() => {
    if (isLoading || isFetching) {
      return (
        <div className="d-flex">
          <div className="mx-auto">
            <OvalLoader color="#777" height={100} width={50} />
          </div>
        </div>
      )
    }
    if (isError && error) {
      return <AcknowledgementsError error={error} />
    }
    if (data) {
      return data.map((datum) => (
        <AcknowledgementsCard key={datum.cluster.buildName} cluster={datum.cluster} numPages={datum.numChunks} />
      ))
    }
    return null
  }, [data, error, isError, isFetching, isLoading])

  return (
    <div className="d-flex flex-column gap-4">
      <div>
        <AcknowledgementsContent />
      </div>
      <div>{body}</div>
    </div>
  )
}

export function useQueryAcknowledgementsKeys() {
  const clusters = useRecoilValue(hasPageClustersSelector)
  return useQuery({
    queryKey: ['acknowledgements_keys'],
    queryFn: async () => {
      const url = '/acknowledgements/acknowledgements_keys.json'
      const res = await axios.get(url)
      if (!res.data) {
        throw new Error(`Unable to fetch acknowledgement keys data: request to URL "${url}" resulted in no data`)
      }
      const json = res.data as AcknowledgementsKeysJson
      return clusters.map((cluster) => {
        const { numChunks } = get(json.acknowledgements, cluster.buildName, { numChunks: 0 })
        return { cluster, numChunks }
      })
    },
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: Number.POSITIVE_INFINITY,
  })
}
