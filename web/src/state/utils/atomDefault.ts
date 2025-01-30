import type { AtomEffect, GetCallback, GetRecoilValue, RecoilState, SerializableParam } from 'recoil'
import { atom, atomFamily, selector, selectorFamily } from 'recoil'

export type AtomDefaultOptions<T> = Omit<AtomOptions<T>, 'default'> & {
  default: (opts: { get: GetRecoilValue; getCallback: GetCallback }) => T
}

/* Atom with `default` accepting also a function */
export function atomDefault<T>(options: AtomDefaultOptions<T>): RecoilState<T> {
  if (typeof options.default === 'function') {
    const defaultFunc = selector<T>({
      key: `${options.key}Default`,
      get: (opts) => options.default(opts),
    })
    return atom({ ...options, default: defaultFunc })
  }
  return atom(options)
}

export interface AtomFamilyDefaultOptions<T, P extends SerializableParam> {
  key: string
  default: (param: P, opts: { get: GetRecoilValue; getCallback: GetCallback }) => T
  dangerouslyAllowMutability?: boolean
  effects?: ReadonlyArray<AtomEffect<T>> | ((param: P) => ReadonlyArray<AtomEffect<T>>)
  effects_UNSTABLE?: ReadonlyArray<AtomEffect<T>> | ((param: P) => ReadonlyArray<AtomEffect<T>>)
}

/* Atom family with `default` accepting also a function */
export function atomFamilyDefault<T, P extends SerializableParam>(
  options: AtomFamilyDefaultOptions<T, P>,
): (param: P) => RecoilState<T> {
  const defaultFunc = selectorFamily<T, P>({
    key: `${options.key}Default`,
    get: (param) => (opts) => options.default(param, opts),
  })
  return atomFamily({ ...options, default: defaultFunc })
}
