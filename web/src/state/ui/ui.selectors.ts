import type { State } from 'src/state/reducer'

export const selectPerCountryTooltipSortBy = (state: State) => state.ui.perCountryTooltipSortBy
export const selectPerCountryTooltipSortReversed = (state: State) => state.ui.perCountryTooltipSortReversed
