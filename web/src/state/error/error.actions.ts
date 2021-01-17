import { actionCreatorFactory } from 'src/state/util/fsaActions'

const action = actionCreatorFactory('Error')

export interface GenericErrorParams {
  error: Error
}

export const errorAdd = action<GenericErrorParams>('errorAdd')

export const errorDismiss = action('errorDismiss')
