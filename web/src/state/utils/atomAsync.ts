import type {
  AtomFamilyOptions,
  AtomOptions,
  GetCallback,
  GetRecoilValue,
  RecoilState,
  SerializableParam,
} from 'recoil'
import { atom, atomFamily, selector, selectorFamily } from 'recoil'

export type AtomAsyncOptions<T> = Omit<AtomOptions<T>, 'default'> & {
  default: (opts: { get: GetRecoilValue; getCallback: GetCallback }) => Promise<T>
}

/* Atom with `default` accepting also an async function */
export function atomAsync<T>(options: AtomAsyncOptions<T>): RecoilState<T> {
  if (typeof options.default === 'function') {
    const defaultAsync = selector<T>({
      key: `async_${options.key}`,
      get: async (opts) => options.default(opts),
    })
    return atom({ ...options, default: defaultAsync })
  }
  return atom(options)
}

export type AtomFamilyAsyncOptions<T, P extends SerializableParam> = Omit<AtomFamilyOptions<T, P>, 'default'> & {
  default: (param: P, opts: { get: GetRecoilValue; getCallback: GetCallback }) => Promise<T>
}

/* Atom family with `default` accepting also an async function */
export function atomFamilyAsync<T, P extends SerializableParam>(
  options: AtomFamilyAsyncOptions<T, P>,
): (param: P) => RecoilState<T> {
  const defaultAsync = selectorFamily<T, P>({
    key: `async_${options.key}`,
    get: (param) => async (opts) => options.default(param, opts),
  })
  return atomFamily({ ...options, default: defaultAsync })
}
