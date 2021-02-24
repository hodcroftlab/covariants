import { get } from 'lodash'

import acknowledgements from 'src/../data/acknowledgements/acknowledgements_keys.json'

export function getClusterEpiIslsNumChunks(clusterBuildName: string): number {
  const acks = get(acknowledgements, 'acknowledgements')

  if (!acks) {
    console.warn(`Acknowledgements not found`)
  }

  const numChunksStr = get(acks, clusterBuildName)

  if (!numChunksStr) {
    throw new Error(`Acknowledgements not found for ${clusterBuildName}`)
  }

  const numChunks = Number.parseInt(numChunksStr.numChunks, 10)
  if (!numChunks) {
    throw new Error(`Acknowledgements are corrupted for ${clusterBuildName}`)
  }

  return numChunks
}
