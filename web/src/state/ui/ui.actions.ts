import { actionCreatorFactory } from 'src/state/util/fsaActions'

import type { PerCountryTooltipSortBy } from 'src/state/ui/ui.reducer'

const action = actionCreatorFactory('Ui')

export interface GenericErrorParams {
  error: Error
}

export const setPerCountryTooltipSortBy = action<{ perCountryTooltipSortBy: PerCountryTooltipSortBy }>(
  'setPerCountryTooltipSortBy',
)

export const setPerCountryTooltipSortReversed = action<{ perCountryTooltipSortReversed: boolean }>(
  'setPerCountryTooltipSortReversed',
)
