import type { AtomEffect } from 'recoil'

export type AtomEffectParams<T> = Parameters<AtomEffect<T>>[0]
