import type { Action, AsyncActionCreators } from 'src/state/util/fsaActions'
import type { SagaGenerator } from 'typed-redux-saga'
import { call, cancelled, put } from 'typed-redux-saga'

import { sanitizeError } from 'src/helpers/sanitizeError'

/**
 * Produces a saga that wraps an original worker saga, into a common usage
 * pattern typical for asynchronous operations, with FSA-compliant actions.
 *
 * @description Accepts a saga ("worker") and a `typescript-fsa`
 * "asynchronous action creators" object (containing action creators 'started',
 * 'done' and 'failed', each adhering to FSA standard)
 * and produces another saga which organizes actions around the worker
 * call. Before running the worker, our wrapper will first dispatch the
 * 'started' action. If worker yield*s a successful result, then 'done'
 * action is dispatched. Otherwise (if worker fails or cancelled), 'failed'
 * action is dispatched.
 *
 * TODO: make it more type-safe: replace `any` with strict types,
 *  add explicit return types
 *
 * @see https://github.com/redux-utilities/flux-standard-action
 *
 * @param asyncActionCreators
 * @param worker
 */
export default function fsaSaga<Params, Result>(
  asyncActionCreators: AsyncActionCreators<Params, Result, Error>,
  worker: (params: Params) => SagaGenerator<Result>,
) {
  return function* wrappedSaga(action: Action<Params>) {
    const params = action.payload

    // Dispatch "started" action
    yield* put(asyncActionCreators.started(params))

    try {
      // Call worker
      const result = yield* call(worker, params)

      // Worker succeeded. dispatch "done" action with results
      yield* put(asyncActionCreators.done({ params, result }))
    } catch (error_) {
      // Worker failed. Print error and dispatch an action of type "failed" with error payload.
      const error = sanitizeError(error_)
      console.error(error)
      yield* put(asyncActionCreators.failed({ params, error }))
    } finally {
      // Worker was cancelled (e.g. manually or as a result of take*).
      // Dispatch "failed" action with the special error value.
      if (yield* cancelled()) {
        yield* put(asyncActionCreators.cancelled({ params }))
      }
    }
  }
}
