import { actionCreatorFactory } from 'src/state/util/fsaActions'

const action = actionCreatorFactory('Data')

export const addEpiIsls = action<{ cluster: string; page: number; epiIsls: string[] }>('addEpiIsls')

export interface FetchEpiIslsParams {
  cluster: string
  page: number
}

export interface FetchEpiIslsResult {
  epiIsls: string[]
}

export const fetchEpiIsls = action.async<FetchEpiIslsParams, void, Error>('fetchEpiIsls')
