/* eslint-disable unicorn/consistent-function-scoping */
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { useRecoilValue } from 'recoil'
import { server } from 'src/components/SharedMutations/__tests__/mockRequests'
import { FETCHER } from 'src/hooks/useAxiosQuery'
import { clustersAtom } from 'src/state/Clusters'
import { RecoilRootAndQueryClientWrapper, renderHookWithTimeout } from 'src/helpers/__tests__/providers'

describe('clustersAtom', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())

  afterEach(() => {
    server.resetHandlers()
    FETCHER.getQueryClient().clear()
    vi.clearAllMocks()
  })
  test('Fetches clusters data', async () => {
    const useTestHook = () => {
      return useRecoilValue(clustersAtom)
    }
    const result = await renderHookWithTimeout(useTestHook, RecoilRootAndQueryClientWrapper)

    expect(result[0].buildName).toEqual('20I.Alpha.V1')
  })
})
