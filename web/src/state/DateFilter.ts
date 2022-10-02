import { atom } from 'recoil'

export type DateFilter = [number, number] | null

export const dateFilterAtom = atom<DateFilter>({
  key: 'DateFilter',
  default: null,
})
