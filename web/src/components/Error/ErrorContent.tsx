/* eslint-disable react/destructuring-assignment */
import React, { useMemo } from 'react'
import { Col, Row } from 'reactstrap'

import { ErrorGeneric } from 'src/components/Error/error-types/ErrorGeneric'
import { sanitizeError } from 'src/helpers/sanitizeError'
import { ErrorStack } from './ErrorStyles'

export function ErrorContentMessage({ error }: { error: Error }) {
  return <ErrorGeneric error={error} />
}

export function ErrorContentStack({ error }: { error: Error }) {
  const stackText = error?.stack?.replace(/webpack-internal:\/{3}\.\//g, '')?.replace(/https?:\/\/(.+):\d+\//g, '')
  if (!stackText) {
    return null
  }

  return <ErrorStack>{stackText}</ErrorStack>
}

export function ErrorContent(props: { error?: unknown }) {
  const error = useMemo(() => sanitizeError(props.error), [props.error])

  if (!props.error) {
    return null
  }

  return (
    <Row noGutters>
      <Col>
        <Row noGutters>
          <Col>
            <ErrorContentMessage error={error} />
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <ErrorContentStack error={error} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
