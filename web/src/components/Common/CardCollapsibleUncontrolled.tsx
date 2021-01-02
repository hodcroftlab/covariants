import React, { PropsWithChildren, useState } from 'react'

import { CardCollapsible } from 'src/components/Common/CardCollapsible'

export interface CollapsibleCardProps {
  className?: string
  collapsedByDefault?: boolean
  title?: React.ReactNode
}

export function CardCollapsibleUncontrolled({
  className,
  collapsedByDefault = false,
  title,
  children,
}: PropsWithChildren<CollapsibleCardProps>) {
  const [collapsed, setCollapsed] = useState(collapsedByDefault)

  return (
    <CardCollapsible className={className} title={title} collapsed={collapsed} setCollapsed={setCollapsed}>
      {children}
    </CardCollapsible>
  )
}
