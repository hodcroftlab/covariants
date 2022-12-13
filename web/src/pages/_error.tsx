import React, { useMemo } from 'react'
import type { NextPageContext } from 'next'
import styled from 'styled-components'
import { Button, Col, Row } from 'reactstrap'
import { ErrorContent } from 'src/components/Error/ErrorContent'
import { ErrorContentExplanation } from 'src/components/Error/ErrorContentExplanation'
import { useReloadPage } from 'src/hooks/useReloadPage'

export const MainContent = styled.main`
  margin: 0 auto;
  height: 100%;
  max-width: 960px;
`

export interface ErrorPageProps {
  statusCode?: number
  title?: string
  error?: Error | undefined
  showDetails?: boolean
}

function ErrorPage({ title, error, showDetails = true }: ErrorPageProps) {
  const reload = useReloadPage('/')

  const errorContent = useMemo(() => {
    if (!showDetails || !error) {
      return null
    }

    return (
      <Row noGutters>
        <Col>
          <ErrorContent error={error} />
        </Col>
      </Row>
    )
  }, [error, showDetails])

  return (
    <MainContent>
      <Row noGutters>
        <Col className="text-center text-danger">
          <h2>{title ?? 'An error has occurred'}</h2>
        </Col>
      </Row>

      {errorContent}

      <Row noGutters>
        <Col>
          <ErrorContentExplanation />
        </Col>
      </Row>

      <Row noGutters>
        <Col className="w-100 d-flex">
          <Button className="ml-auto" type="button" color="danger" title="Reload the page" onClick={reload}>
            {'Restart'}
          </Button>
        </Col>
      </Row>
    </MainContent>
  )
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): Promise<ErrorPageProps> | ErrorPageProps => {
  const statusCode = res?.statusCode ?? err?.statusCode
  return { statusCode, error: err ?? undefined }
}

export default ErrorPage
