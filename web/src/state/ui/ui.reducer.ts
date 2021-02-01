import { reducerWithInitialState } from 'src/state/util/fsaReducer'

import { setPerCountryTooltipSortBy, setPerCountryTooltipSortReversed } from './ui.actions'

export enum PerCountryTooltipSortBy {
  country = 'country',
  frequency = 'frequency',
}

export const perCountryTooltipSortByDefault = PerCountryTooltipSortBy.frequency
export const perCountryTooltipSortReversedDefault = true

export interface UiState {
  perCountryTooltipSortBy: PerCountryTooltipSortBy
  perCountryTooltipSortReversed: boolean
}

export const uiDefaultState: UiState = {
  perCountryTooltipSortBy: perCountryTooltipSortByDefault,
  perCountryTooltipSortReversed: perCountryTooltipSortReversedDefault,
}

export const uiReducer = reducerWithInitialState(uiDefaultState)
  .icase(setPerCountryTooltipSortBy, (state, { perCountryTooltipSortBy }) => {
    state.perCountryTooltipSortBy = perCountryTooltipSortBy
  })

  .icase(setPerCountryTooltipSortReversed, (state, { perCountryTooltipSortReversed }) => {
    state.perCountryTooltipSortReversed = perCountryTooltipSortReversed
  })
