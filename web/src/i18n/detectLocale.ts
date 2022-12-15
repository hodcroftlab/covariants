import { LocaleKey } from './i18n'

type NavigatorPlus = Navigator & { browserLanguage?: string; userLanguage?: string; systemLanguage?: string }

export interface DetectLanguageParams {
  defaultLanguage: LocaleKey
  availableLocales: LocaleKey[]
  shorten?: boolean
}

export function detectLocale({ defaultLanguage, availableLocales, shorten = true }: DetectLanguageParams): LocaleKey {
  if (typeof navigator === 'undefined') {
    return defaultLanguage
  }

  const navigatorLocal = (navigator ?? window.navigator) as NavigatorPlus | undefined

  let language
  language =
    navigatorLocal?.languages && navigatorLocal.languages.length > 0
      ? navigatorLocal.language[0] ?? navigatorLocal.language
      : navigatorLocal?.browserLanguage ??
        navigatorLocal?.userLanguage ??
        navigatorLocal?.systemLanguage ??
        defaultLanguage

  if (!language) {
    language = defaultLanguage
  }

  if (shorten) {
    language = language.slice(0, 2)
  }

  if (availableLocales.includes(language as LocaleKey)) {
    return language as LocaleKey
  }

  return defaultLanguage
}
