import type { QueryKey, UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { axiosFetch } from 'src/io/axiosFetch'

const QUERY_OPTIONS_DEFAULT = {
  staleTime: Number.POSITIVE_INFINITY,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchInterval: Number.POSITIVE_INFINITY,
}

function queryOptionsDefaulted<T>(options: T) {
  let newOptions = QUERY_OPTIONS_DEFAULT
  if (options) {
    newOptions = { ...newOptions, ...options }
  }
  return newOptions
}

export type QueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'initialData'> & {
  initialData?: () => undefined
}

export type UseAxiosQueryOptions<TData = unknown> = QueryOptions<TData, Error, TData, string[]>

/** Makes a cached fetch request */
export function useAxiosQuery<TData = unknown>(url: string, options?: UseAxiosQueryOptions<TData>): TData {
  const newOptions = useMemo(() => queryOptionsDefaulted(options), [options])
  const res = useQuery<TData, Error, TData, string[]>([url], async () => axiosFetch(url), newOptions)
  return useMemo(() => {
    if (!res.data) {
      throw new Error(`Fetch failed: ${url}`)
    }
    return res.data
  }, [res.data, url])
}
