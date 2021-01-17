/* eslint-disable @typescript-eslint/ban-ts-comment */
import { composeWithDevTools } from 'redux-devtools-extension'

export function withReduxDevTools<StoreEnhancerIn, StoreEnhancerOut>(
  enhancer: StoreEnhancerIn,
): StoreEnhancerIn | StoreEnhancerOut {
  if (!(process.env.ENABLE_REDUX_DEV_TOOLS === 'true' && composeWithDevTools)) {
    return enhancer
  }

  const compose = composeWithDevTools({
    trace: true,
    traceLimit: 25,
    actionsBlacklist: '@@INIT',
  })

  // @ts-ignore
  return compose(enhancer)
}
