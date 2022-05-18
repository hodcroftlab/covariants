import axios from 'axios'
import React, { useCallback, useMemo, useState } from 'react'

import { Oval as OvalLoader } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import PaginationComponent from 'react-reactstrap-pagination'
import { CardBody } from 'reactstrap'
import { AcknowledgementEpiIsl } from 'src/components/Acknowledgements/AcknowledgementEpiIsl'
import { AcknowledgementsError } from 'src/components/Acknowledgements/AcknowledgementsError'
import { CardCollapsible } from 'src/components/Common/CardCollapsible'

import type { ClusterDatum } from 'src/io/getClusters'
import styled from 'styled-components'

export interface AcknowledgementsKeysDatum {
  numChunks: number
}

export type AcknowledgementsKeysData = Record<string, AcknowledgementsKeysDatum | undefined>

export interface AcknowledgementsKeysJson {
  acknowledgements: AcknowledgementsKeysData
}

export const PaginationContainer = styled.div`
  display: flex;
  & > * {
    margin: 0 auto;
  }
`

export const Pagination = styled(PaginationComponent)``

export function useQueryAcknowledgements(cluster: string, page: number) {
  const url = useMemo(() => {
    const pageString = page.toString().padStart(3, '0')
    return `acknowledgements/${cluster}/${pageString}.json`
  }, [cluster, page])

  return useQuery(
    ['acknowledgements_page', cluster, page],
    async () => {
      const res = await axios.get(url)
      if (!res.data) {
        throw new Error(`Unable to fetch acknowledgements data: request to URL "${url}" resulted in no data`)
      }
      return res.data as string[]
    },
    {
      staleTime: Number.POSITIVE_INFINITY,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: Number.POSITIVE_INFINITY,
    },
  )
}

export interface AcknowledgementsCardBodyProps {
  cluster: ClusterDatum
  numPages: number
}

export function AcknowledgementsCardBody({ cluster, numPages }: AcknowledgementsCardBodyProps) {
  const [page, setPage] = useState(0)
  const handlePagination = useCallback((page: number) => setPage(page - 1) /* one-based to zero-based */, [])
  const { isLoading, isFetching, isError, data: epiIsls, error } = useQueryAcknowledgements(cluster.build_name, page)

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
    return null
  }, [error, isError, isFetching, isLoading])

  const epiIslsComponents = useMemo(() => {
    if (epiIsls) {
      return epiIsls.map((epiIsl) => (
        <span key={`$${cluster.display_name}-${epiIsl}`}>
          <AcknowledgementEpiIsl epiIsl={epiIsl} />
          {', '}
        </span>
      ))
    }
    return null
  }, [cluster.display_name, epiIsls])

  return (
    <CardBody>
      <PaginationContainer>
        <Pagination
          totalItems={numPages}
          pageSize={1}
          onSelect={handlePagination}
          maxPaginationNumbers={5}
          defaultActivePage={1}
          firstPageText="<<"
          previousPageText="<"
          nextPageText=">"
          lastPageText=">>"
        />
      </PaginationContainer>

      <div>{body}</div>
      <div>{epiIslsComponents}</div>
    </CardBody>
  )
}

export interface AcknowledgementsCardProps {
  cluster: ClusterDatum
  numPages: number
}

export function AcknowledgementsCard({ cluster, numPages }: AcknowledgementsCardProps) {
  const [collapsed, setCollapsed] = useState(true)
  return (
    <CardCollapsible className="my-2" title={cluster.display_name} collapsed={collapsed} setCollapsed={setCollapsed}>
      {!collapsed && <AcknowledgementsCardBody cluster={cluster} numPages={numPages} />}
    </CardCollapsible>
  )
}
