import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { CardBody, UncontrolledAlert } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { URL_GITHUB } from 'src/constants'
import { getClusterEpiIslsNumChunks } from 'src/io/getClusterEpiIslsNumChunks'

import type { ClusterDatum } from 'src/io/getClusters'
import { AcknowledgementEpiIsl } from 'src/components/Acknowledgements/AcknowledgementEpiIsl'
import { CardCollapsible } from 'src/components/Common/CardCollapsible'
import { fetchEpiIsls } from 'src/state/data/data.actions'
import { selectEpiIsls, selectEpiIslsError, selectEpiIslsLoading } from 'src/state/data/data.selectors'
import PaginationComponent from 'react-reactstrap-pagination'

export function AcknowledgementsCardError({ error }: { error: string }) {
  return (
    <UncontrolledAlert color="danger">
      <p className="text-danger">{`Error: ${error}`}</p>
      <p>
        {'This is probably a bug. Please report it to developers on '}
        <LinkExternal href={`${URL_GITHUB}/issues`}>{'GitHub'}</LinkExternal>
      </p>
    </UncontrolledAlert>
  )
}

export interface AcknowledgementEpiIslPageProps {
  cluster: ClusterDatum
  page: number
}

export function AcknowledgementEpiIslPage({ cluster, page }: AcknowledgementEpiIslPageProps) {
  const epiIsls = useSelector(selectEpiIsls(cluster.build_name, page))
  const loading = useSelector(selectEpiIslsLoading(cluster.build_name, page))
  const error = useSelector(selectEpiIslsError(cluster.build_name, page))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEpiIsls.trigger({ cluster: cluster.build_name, page }))
  }, [cluster.build_name, dispatch, page])

  return (
    <div>
      {epiIsls &&
        epiIsls.map((epiIsl) => (
          <span key={`$${cluster.display_name}-${epiIsl}`}>
            <AcknowledgementEpiIsl epiIsl={epiIsl} />
            {', '}
          </span>
        ))}
      {loading && 'Loading...'}
      {error && <AcknowledgementsCardError error={error} />}
    </div>
  )
}

export interface AcknowledgementsCardProps {
  cluster: ClusterDatum
}

export function AcknowledgementsCard({ cluster }: AcknowledgementsCardProps) {
  const [collapsed, setCollapsed] = useState(true)
  const [page, setPage] = useState(0)
  const numPages = useMemo(() => getClusterEpiIslsNumChunks(cluster.build_name), [cluster.build_name])
  const handlePagination = useCallback((page: number) => setPage(page - 1) /* one-based to zero-based */, [])

  return (
    <CardCollapsible title={cluster.display_name} collapsed={collapsed} setCollapsed={setCollapsed}>
      {!collapsed && (
        <CardBody>
          <AcknowledgementEpiIslPage cluster={cluster} page={page} />

          <PaginationComponent
            totalItems={numPages}
            pageSize={1}
            onSelect={handlePagination}
            maxPaginationNumbers={9}
            defaultActivePage={1}
          />
        </CardBody>
      )}
    </CardCollapsible>
  )
}
