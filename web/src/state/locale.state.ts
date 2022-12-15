import { atom } from 'recoil'
import i18n, { changeLocale, DEFAULT_LOCALE_KEY } from 'src/i18n/i18n'
import { persistAtom } from 'src/state/persist/localStorage'

export const localeAtom = atom<string>({
  key: 'localeKey',
  default: DEFAULT_LOCALE_KEY as string,
  effects: [
    function setLocale({ onSet }) {
      onSet((localeKey) => {
        changeLocale(i18n, localeKey).catch(console.error)
      })
    },
    persistAtom,
  ],
})
