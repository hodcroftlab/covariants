import React, { Suspense, useCallback, useMemo, useState } from 'react'
import PaginationComponent from 'react-reactstrap-pagination'
import { CardBody } from 'reactstrap'
import styled from 'styled-components'
import { useAxiosQuery } from 'src/hooks/useAxiosQuery'
import { AcknowledgementEpiIsl } from 'src/components/Acknowledgements/AcknowledgementEpiIsl'
import { CardCollapsible } from 'src/components/Common/CardCollapsible'
import { SPINNER } from 'src/components/Loading/Loading'
import type { ClusterDatum } from 'src/io/getClusters'

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
  return useAxiosQuery<string[]>(url)
}

export interface AcknowledgementsCardBodyProps {
  cluster: ClusterDatum
  numPages: number
}

export function AcknowledgementsCardBody({ cluster, numPages }: AcknowledgementsCardBodyProps) {
  const [page, setPage] = useState(0)
  const handlePagination = useCallback((page: number) => setPage(page - 1) /* one-based to zero-based */, [])
  const epiIsls = useQueryAcknowledgements(cluster.build_name, page)

  const body = useMemo(() => {
    return (epiIsls ?? []).map((epiIsl) => (
      <span key={`$${cluster.display_name}-${epiIsl}`}>
        <AcknowledgementEpiIsl epiIsl={epiIsl} />
        {', '}
      </span>
    ))
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
      {!collapsed && (
        <Suspense fallback={SPINNER}>
          <AcknowledgementsCardBody cluster={cluster} numPages={numPages} />
        </Suspense>
      )}
    </CardCollapsible>
  )
}
