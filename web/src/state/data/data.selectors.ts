import { get } from 'lodash'

import type { State } from 'src/state/reducer'

export const selectEpiIsls = (clusterBuildName: string, page: number) => (state: State): string[] =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  get(state.data.epiIsls, `${clusterBuildName}[${page}]`, [])

export const selectEpiIslsLoading = (clusterBuildName: string, page: number) => (state: State): boolean =>
  get(state.data.loading, `${clusterBuildName}[${page}]`, 0) !== 0

export const selectEpiIslsError = (clusterBuildName: string, page: number) => (state: State): string | undefined =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  get(state.data.errors, `${clusterBuildName}[${page}]`, undefined)
