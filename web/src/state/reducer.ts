import type { RouterState } from 'connected-next-router/types'
import { routerReducer } from 'connected-next-router'
import { combineReducers } from 'redux'

import { dataReducer, DataState } from './data/data.reducer'
import { errorReducer, ErrorState } from './error/error.reducer'
import { uiReducer, UiState } from './ui/ui.reducer'

export interface State {
  data: DataState
  error: ErrorState
  router: RouterState
  ui: UiState
}

const rootReducer = () =>
  combineReducers({
    data: dataReducer,
    error: errorReducer,
    router: routerReducer,
    ui: uiReducer,
  })

export default rootReducer
