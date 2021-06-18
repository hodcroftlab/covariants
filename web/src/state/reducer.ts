import type { RouterState } from 'connected-next-router/types'
import { routerReducer } from 'connected-next-router'
import { combineReducers } from 'redux'

import { errorReducer, ErrorState } from './error/error.reducer'
import { uiReducer, UiState } from './ui/ui.reducer'

export interface State {
  error: ErrorState
  router: RouterState
  ui: UiState
}

const rootReducer = () =>
  combineReducers({
    error: errorReducer,
    router: routerReducer,
    ui: uiReducer,
  })

export default rootReducer
