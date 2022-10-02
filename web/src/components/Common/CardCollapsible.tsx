import React, { PropsWithChildren, useCallback } from 'react'

import styled from 'styled-components'
import { MdArrowDropDown } from 'react-icons/md'
import { Card as CardBase, CardHeader as CardHeaderBase, Collapse } from 'reactstrap'

const Card = styled(CardBase)``

const CardHeader = styled(CardHeaderBase)`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const CollapseIcon = styled(MdArrowDropDown)<{ $rotated?: boolean }>`
  display: inline;
  fill: ${(props) => props.theme.gray550};
  transition: transform linear 0.25s;
  transform: rotate(${(props) => (props.$rotated ? '-90deg' : '0deg')});
`

const CardTitle = styled.span`
  display: flex;
  flex-grow: 1;
  margin-left: 8px;
`

export interface CollapsibleCardProps {
  className?: string
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  title?: React.ReactNode
}

export function CardCollapsible({
  className,
  title,
  collapsed,
  setCollapsed,
  children,
}: PropsWithChildren<CollapsibleCardProps>) {
  const toggle = useCallback(() => setCollapsed(!collapsed), [collapsed, setCollapsed])

  return (
    <Card className={className}>
      <CardHeader onClick={toggle}>
        <CollapseIcon size={30} $rotated={collapsed} />
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <Collapse isOpen={!collapsed}>{children}</Collapse>
    </Card>
  )
}
