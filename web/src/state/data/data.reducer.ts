import { get, set, uniq } from 'lodash'

import { reducerWithInitialState } from 'src/state/util/fsaReducer'
import { addEpiIsls, fetchEpiIsls } from './data.actions'

export interface DataState {
  epiIsls: Record<string, string[][]>
  loading: Record<string, number[]>
  errors: Record<string, (string | undefined)[]>
}

export const dataDefaultState: DataState = {
  epiIsls: {},
  loading: {},
  errors: {},
}

export const dataReducer = reducerWithInitialState(dataDefaultState) // prettier-ignore
  .icase(addEpiIsls, (state, { cluster, page, epiIsls }) => {
    const oldEpiIsls = get(state.epiIsls, `${cluster}[${page}]`, [])
    const newEsls = uniq([...oldEpiIsls, ...epiIsls])
    set(state.epiIsls, `${cluster}[${page}]`, newEsls)
  })

  .icase(fetchEpiIsls.trigger, (state, { cluster, page }) => {
    const loading = get(state.loading, `${cluster}[${page}]`, 0)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    set(state.loading, `${cluster}[${page}]`, loading + 1) // eslint-disable-line @typescript-eslint/restrict-plus-operands
  })

  .icase(fetchEpiIsls.done, (state, { params: { cluster, page } }) => {
    const loading = get(state.loading, `${cluster}[${page}]`, 0)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    set(state.loading, `${cluster}[${page}]`, loading - 1)
    set(state.errors, `${cluster}[${page}]`, undefined)
  })

  .icase(fetchEpiIsls.cancelled, (state, { params: { cluster, page } }) => {
    const loading = get(state.loading, `${cluster}[${page}]`, 0)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    set(state.loading, `${cluster}[${page}]`, loading - 1)
  })

  .icase(fetchEpiIsls.failed, (state, { params: { cluster, page }, error }) => {
    const loading = get(state.loading, `${cluster}[${page}]`, 0)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    set(state.loading, `${cluster}[${page}]`, loading - 1)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    set(state.errors, `${cluster}[${page}]`, error.message)
  })
