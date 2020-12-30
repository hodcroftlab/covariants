import { get } from 'lodash'

import clusterColors from 'src/../data/clusterColors.json'

export function getClusterColor(cluster: string) {
  return get<Record<string, string>, string>(clusterColors, cluster) ?? '#555555'
}
