import type { Meta, StoryObj } from '@storybook/react'
import React, { PropsWithChildren, useState } from 'react'
import { atom, useAtom } from 'jotai'
import { userEvent, within } from '@storybook/test'
import { CardCollapsible, CollapsibleCardProps } from 'src/components/Common/CardCollapsible'

const meta: Meta<typeof CardCollapsible> = {
  component: CardCollapsible,
  args: {
    title: 'Collapse This!',
    children: 'Expaaaanded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const expandable = canvas.getByText('Collapse This!')
    await userEvent.click(expandable)
    await userEvent.click(expandable)
  },
}

export default meta
type Story = StoryObj<typeof meta>

const LocalStateWrapper = (args: PropsWithChildren<CollapsibleCardProps>) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <CardCollapsible title={args.title} collapsed={collapsed} setCollapsed={setCollapsed}>
      {args.children}
    </CardCollapsible>
  )
}

export const UseLocalState: Story = {
  render: (args) => {
    return <LocalStateWrapper {...args} />
  },
  args: {
    title: 'Collapse This!',
    children: 'Expaaaanded',
  },
}

const collapsibleAtom = atom(true)

const JotaiStateWrapper = (args: PropsWithChildren<CollapsibleCardProps>) => {
  const [collapsed, setCollapsed] = useAtom(collapsibleAtom)

  return (
    <CardCollapsible title={args.title} collapsed={collapsed} setCollapsed={setCollapsed}>
      {args.children}
    </CardCollapsible>
  )
}

export const UseJotaiState: Story = {
  render: (args) => {
    return <JotaiStateWrapper {...args} />
  },
}
