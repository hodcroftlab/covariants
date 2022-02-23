import { atom } from 'recoil'

export enum TooltipSortCriterion {
  country = 'country',
  frequency = 'frequency',
}

export const tooltipSortAtom = atom({
  key: 'TooltipSort',
  default: {
    criterion: TooltipSortCriterion.frequency,
    reversed: false,
  },
})
