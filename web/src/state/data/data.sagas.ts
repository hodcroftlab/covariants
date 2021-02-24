import { call, put, takeLatest } from 'typed-redux-saga'

import fsaSaga from 'src/state/util/fsaSaga'
import { addEpiIsls, fetchEpiIsls, FetchEpiIslsParams } from 'src/state/data/data.actions'
import { getClusterEpiIslsNumChunks } from 'src/io/getClusterEpiIslsNumChunks'

export interface GetDataParams {
  cluster: string
  indexStr: string
}

export async function getData({ cluster, indexStr }: GetDataParams): Promise<string[] | undefined> {
  return import(`src/../data/acknowledgements/${cluster}/${indexStr}.json`) // prettier-ignore
    .then(({ default: data }) => data as string[] | undefined)
}

export function* runFetchEpiIsls({ cluster, page }: FetchEpiIslsParams) {
  const numChunks = getClusterEpiIslsNumChunks(cluster)

  if (page > numChunks) {
    throw new Error(`Unable to find data for page ${page}`)
  }

  const indexStr = page.toString(10).padStart(3, '0')
  const epiIsls = yield* call(getData, { cluster, indexStr })
  if (epiIsls) {
    yield* put(addEpiIsls({ cluster, page, epiIsls }))
  }
}

export default [takeLatest(fetchEpiIsls.trigger, fsaSaga(fetchEpiIsls, runFetchEpiIsls))]
