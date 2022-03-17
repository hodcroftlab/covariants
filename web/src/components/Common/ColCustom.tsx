import React from 'react'

import { Col } from 'reactstrap'
import type { ColProps as ReactstrapColProps } from 'reactstrap/lib/Col'

export interface ColProps extends Omit<ReactstrapColProps, 'ref'> {
  readonly xxl?: number
}

const WIDTHS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']

function ColCustom({ ...restProps }: ColProps) {
  return <Col widths={WIDTHS} {...restProps} />
}

export { ColCustom }
