import { reducerWithInitialState } from 'src/state/util/fsaReducer'

import { errorAdd, errorDismiss } from './error.actions'

export interface ErrorState {
  error?: Error
}

export const errorDefaultState: ErrorState = {
  error: undefined,
}

export const errorReducer = reducerWithInitialState(errorDefaultState)
  .icase(errorAdd, (state, { error }) => {
    state.error = error
  })

  .icase(errorDismiss, (state) => {
    state.error = undefined
  })
