import { QueriesOptions, QueryClientConfig, QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/query-core'
import { keys, values, zip } from 'lodash'
import { useMemo } from 'react'
import { ErrorInternal } from 'src/helpers/ErrorInternal'
import { axiosFetch } from 'src/io/axiosFetch'
import { useQueries } from './useQueriesWithSuspense'

const QUERY_OPTIONS_DEFAULT = {
  staleTime: Number.POSITIVE_INFINITY,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchInterval: Number.POSITIVE_INFINITY,
  suspense: true,
}

function queryOptionsDefaulted<T>(options: T) {
  let newOptions = QUERY_OPTIONS_DEFAULT
  if (options) {
    newOptions = { ...newOptions, ...options }
  }
  return newOptions
}

const REACT_QUERY_OPTIONS_DEFAULT: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      ...QUERY_OPTIONS_DEFAULT,
    },
  },
}

/** Allows to use QuerClient outside of React components */
export class Fetcher {
  private readonly queryClient = new QueryClient(REACT_QUERY_OPTIONS_DEFAULT)

  public getQueryClient(): QueryClient {
    return this.queryClient
  }

  public async fetch<TData = unknown>(url: string, options?: QueryOptions<TData>): Promise<TData> {
    return this.getQueryClient().fetchQuery({
      ...queryOptionsDefaulted(options),
      queryKey: [url],
      queryFn: async () => axiosFetch(url),
    })
  }
}

export const FETCHER = new Fetcher()

export type QueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'initialData'> & {
  initialData?: () => undefined
}

export type UseAxiosQueryOptions<TData = unknown> = QueryOptions<TData, Error, TData, string[]>
export type UseAxiosQueriesOptions<TData = unknown> = QueriesOptions<TData[]>

/** Makes a cached fetch request */
export function useAxiosQuery<TData = unknown>(url: string, options?: UseAxiosQueryOptions<TData>): TData {
  const keys = useMemo(() => [url], [url])
  const optionsDefaulted = useMemo(() => queryOptionsDefaulted(options), [options])
  const res = useQuery<TData, Error, TData, string[]>({queryKey: keys, queryFn: async () => axiosFetch(url), ...optionsDefaulted})
  return useMemo(() => {
    if (!res.data) {
      throw new Error(`Fetch failed: ${url}`)
    }
    return res.data
  }, [res.data, url])
}

/** Make multiple cached fetches in parallel (and uses `Suspense`, by contrast to the default `useQueries()`)  */
export function useAxiosQueries<TData = unknown>(
  namedUrls: Record<string, string>,
  options?: UseAxiosQueriesOptions<TData>,
): TData {
  const newOptions = useMemo(() => queryOptionsDefaulted(options), [options])

  const results = useQueries({
    queries: values(namedUrls).map((url) => ({
      ...newOptions,
      suspense: true,
      useErrorBoundary: true,
      queryKey: [url],
      queryFn: async () => axiosFetch(url),
    })),
    options: {
      suspense: true,
    },
  })

  return useMemo(() => {
    return Object.fromEntries(
      zip(keys(namedUrls), values(namedUrls), results).map(([key, url, result]) => {
        if (!key || !url || !result) {
          throw new ErrorInternal('useAxiosQueries: Attempted to zip arrays of different sizes.')
        }

        if (!result.data) {
          throw new Error(`Fetch failed: ${key}: ${url}`)
        }
        return [key, result.data]
      }),
    )
  }, [namedUrls, results]) as unknown as TData
}
