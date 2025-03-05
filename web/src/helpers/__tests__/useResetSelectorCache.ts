// eslint-disable-next-line camelcase
import { RecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil'

export const useResetSelectorCache = <T>(selector: RecoilValue<T>) => {
  const resetCache = useRecoilRefresher_UNSTABLE(selector)
  void resetCache()
}
