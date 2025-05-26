import React, { useCallback, useMemo } from 'react'
import { DefiningMutationCluster, DefiningMutationListElement } from 'src/io/getDefiningMutationsClusters'

export function DownloadDefiningMutationsButton({
  cluster,
  clusterData,
}: {
  cluster: DefiningMutationListElement
  clusterData: DefiningMutationCluster
}) {
  const download = useCallback(() => {
    const content = JSON.stringify({ ...cluster, ...clusterData })
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `defining_mutations_${cluster.pangoLineage ?? cluster.nextstrainClade}.json`
    document.body.append(a)
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 100)
    a.remove()
  }, [cluster, clusterData])

  const title = useMemo(() => {
    return `Download defining mutation for ${cluster.pangoLineage ?? cluster.nextstrainClade}`
  }, [cluster.pangoLineage, cluster.nextstrainClade])

  return (
    <button className={'btn btn-light'} onClick={download} title={title}>
      <div className="bi bi-download"></div>
      <div className="visually-hidden">{title}</div>
    </button>
  )
}
