import type { State } from 'src/state/reducer'

export const selectLocation = (state: State) => state.router.location

export const selectPathname = (state: State) => state.router.location.pathname
