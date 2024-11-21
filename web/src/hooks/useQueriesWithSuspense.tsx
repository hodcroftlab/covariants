/* eslint-disable @typescript-eslint/no-explicit-any,no-underscore-dangle,@typescript-eslint/no-throw-literal,sonarjs/cognitive-complexity */

/**
 * Modified version of `useQueries()` from `@tanstack/query`. Allows to use Suspense with it.
 * Taken with modifications from this message by @nucleartux:
 * https://github.com/TanStack/query/issues/1523#issuecomment-1221505684
 */

import * as React from 'react'
import { isNil, zip } from 'lodash'
import { notUndefinedOrNull } from 'src/helpers/notUndefined'
import { useSyncExternalStore } from 'use-sync-external-store/shim'
import { notifyManager, QueriesObserver } from '@tanstack/query-core'
import {
  useQueryClient,
  useIsRestoring,
  UseQueryOptions,
  useQueryErrorResetBoundary,
  QueryObserver,
  QueriesOptions,
  QueriesResults,
} from '@tanstack/react-query'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface QueriesObserverExt extends QueriesObserver {
  observers: QueryObserver[]
}

export function useQueries<T extends any[]>({
  queries,
  context,
  options,
}: {
  queries: readonly [...QueriesOptions<T>]
  // TODO: remove this ts-ignore, only here to get intermediate build off the ground
  // @ts-ignore
  context?: UseQueryOptions['context']
  options: { suspense?: boolean }
}): QueriesResults<T> {
  // TODO: remove this ts-ignore, only here to get intermediate build off the ground
  // @ts-ignore
  const queryClient = useQueryClient({ context })
  const isRestoring = useIsRestoring()
  const errorResetBoundary = useQueryErrorResetBoundary()

  const defaultedOptions = React.useMemo(
    () =>
      queries.map((options) => {
        const defaultedOptions = queryClient.defaultQueryOptions(options)

        defaultedOptions.suspense = true
        // TODO: remove this ts-ignore, only here to get intermediate build off the ground
        // @ts-ignore
        defaultedOptions.useErrorBoundary = true
        defaultedOptions.retryOnMount = false

        // Make sure the results are already in fetching state before subscribing or updating options
        defaultedOptions._optimisticResults = isRestoring ? 'isRestoring' : 'optimistic'

        return defaultedOptions
      }),
    [queries, queryClient, isRestoring],
  )

  const [observer] = React.useState(
    () => new QueriesObserver(queryClient, defaultedOptions) as unknown as QueriesObserverExt,
  )
  // TODO: remove this ts-ignore, only here to get intermediate build off the ground
  // @ts-ignore
  const results = observer.getOptimisticResult(defaultedOptions)

  useSyncExternalStore(
    React.useCallback(
      (onStoreChange) => (isRestoring ? () => undefined : observer.subscribe(notifyManager.batchCalls(onStoreChange))),
      [observer, isRestoring],
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult(),
  )

  React.useEffect(() => {
    // Do not notify on updates because of changes in the options because
    // these changes should already be reflected in the optimistic result.
    // TODO: remove this ts-ignore, only here to get intermediate build off the ground
    // @ts-ignore
    observer.setQueries(defaultedOptions, { listeners: false })
  }, [defaultedOptions, observer])
  // TODO: remove this ts-ignore, only here to get intermediate build off the ground
  // @ts-ignore
  const isError = results.some((r) => r.isError)
  // TODO: remove this ts-ignore, only here to get intermediate build off the ground
  // @ts-ignore
  const error = results.find((r) => !isNil(r.error))
  if (isError && error) {
    // TODO: remove this ts-ignore, only here to get intermediate build off the ground
    // @ts-ignore
    throw error?.error
  }

  const fetchPromises = zip(observer.observers, defaultedOptions, results).map(
    ([observer, defaultedOption, result]) => {
      if (isNil(observer) || isNil(defaultedOption) || isNil(result)) {
        throw new Error('useQueries: Attempted to zip arrays of different sizes.')
      }
      // TODO: remove this ts-ignore, only here to get intermediate build off the ground
      // @ts-ignore
      const shouldFetch = options.suspense && result.isLoading && result.isFetching && !isRestoring
      if (shouldFetch) {
        return observer.fetchOptimistic({
          ...defaultedOption,
          _optimisticResults: undefined,
          staleTime: defaultedOption.staleTime ?? 1000,
        })
      }
      return undefined
    },
  )

  const pendingPromises = fetchPromises.filter(notUndefinedOrNull)
  if (pendingPromises.length > 0) {
    throw Promise.all(pendingPromises).catch(() => {
      errorResetBoundary.clearReset()
    })
  }

  return zip(observer.observers, results).map(([observer, result]) => {
    if (!observer || !result) {
      throw new Error('useQueries: Attempted to zip arrays of different sizes.')
    }
    // TODO: remove this ts-ignore, only here to get intermediate build off the ground
    // @ts-ignore
    return observer.trackResult(result)
  }) as QueriesResults<T>
}
