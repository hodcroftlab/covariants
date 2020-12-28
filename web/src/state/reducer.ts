import { combineReducers } from 'redux'
import { routerReducer } from 'connected-next-router'
import { RouterState } from 'connected-next-router/types'

import { errorReducer, ErrorState } from './error/error.reducer'

export interface State {
  router: RouterState
  error: ErrorState
}

const rootReducer = () =>
  combineReducers({
    router: routerReducer,
    error: errorReducer,
  })

export default rootReducer
