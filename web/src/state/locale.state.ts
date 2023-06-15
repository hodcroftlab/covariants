import { atom } from 'recoil'
import i18n, { changeLocale, DEFAULT_LOCALE_KEY } from 'src/i18n/i18n'
import { persistAtom } from 'src/state/persist/localStorage'
// import { removeFromUrlQuery, updateUrlQuery } from 'src/helpers/urlQuery'

// export async function setLocaleInUrl(localeKey: string) {
//   await (localeKey === DEFAULT_LOCALE_KEY ? removeFromUrlQuery('lang') : updateUrlQuery({ lang: localeKey }))
// }

export const localeAtom = atom<string>({
  key: 'localeKey',
  default: DEFAULT_LOCALE_KEY as string,
  effects: [
    function setLocale({ onSet }) {
      onSet((localeKey) => {
        changeLocale(i18n, localeKey).catch(console.error)
      })
    },
    // function syncQueryParams({ onSet }) {
    //   onSet((localeKey) => {
    //     void setLocaleInUrl(localeKey) // eslint-disable-line no-void
    //   })
    // },
    persistAtom,
  ],
})
