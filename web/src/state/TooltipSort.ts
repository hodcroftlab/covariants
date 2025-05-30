import { atomFamily } from 'recoil'
import { SortDirection } from '@tanstack/react-table'

export const tooltipSortAtomFamily = atomFamily<{ column: string; sortDirection: SortDirection }, string>({
  key: 'TooltipSortAtomFamily',
  default: {
    column: 'frequency',
    sortDirection: 'desc',
  },
})
