import { combineReducers } from 'redux'
import { routerReducer } from 'connected-next-router'
import { RouterState } from 'connected-next-router/types'

import { errorReducer, ErrorState } from './error/error.reducer'
import { uiReducer, UiState } from './ui/ui.reducer'

export interface State {
  router: RouterState
  error: ErrorState
  ui: UiState
}

const rootReducer = () =>
  combineReducers({
    router: routerReducer,
    error: errorReducer,
    ui: uiReducer,
  })

export default rootReducer
