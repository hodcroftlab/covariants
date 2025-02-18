import { atom } from 'recoil'
import { persistAtom } from 'src/state/persist/localStorage'

export const enablePangolinAtom = atom<boolean>({
  key: 'enablePangolin',
  default: false,
  effects: [persistAtom],
})
