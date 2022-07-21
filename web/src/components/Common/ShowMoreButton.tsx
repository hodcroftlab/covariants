import React, { useCallback, useMemo, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'

export function useShowMoreButton() {
  const [showMore, setShowMore] = useState(false)

  const onShowMore = useCallback(() => setShowMore(true), [])

  const showMoreButton = useMemo(() => {
    if (showMore) {
      return null
    }

    return (
      <Row noGutters className="w-100">
        <Col className="w-100 d-flex">
          <Button className="mx-auto" type="button" color="secondary" onClick={onShowMore}>
            {'Show more'}
          </Button>
        </Col>
      </Row>
    )
  }, [onShowMore, showMore])

  return { showMore, setShowMore, showMoreButton }
}
