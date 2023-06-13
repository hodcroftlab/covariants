import { useCallback } from 'react'
import { isString } from 'lodash'
import { useTranslation } from 'react-i18next'

export interface UseTranslationSafeResult {
  t: (key: string, options?: Record<string, unknown>) => string
}

export function useTranslationSafe(): UseTranslationSafeResult {
  const response = useTranslation()
  const t = useCallback(
    (key: string, options?: Record<string, unknown>): string => {
      const res = response.t(key, options)
      if (isString(res)) {
        return res
      }
      return key
    },
    [response],
  )
  return { t }
}
