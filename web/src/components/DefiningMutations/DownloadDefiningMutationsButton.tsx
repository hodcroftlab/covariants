import React, { useCallback, useMemo } from 'react'
import { DefiningMutationCluster } from 'src/io/getDefiningMutationsClusters'

export function DownloadDefiningMutationsButton({ cluster }: { cluster: DefiningMutationCluster }) {
  const download = useCallback(() => {
    const content = JSON.stringify(cluster)
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `defining_mutations_${cluster.lineage}.json`
    document.body.append(a)
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 100)
    a.remove()
  }, [cluster])

  const title = useMemo(() => {
    return `Download defining mutation for ${cluster.lineage}`
  }, [cluster.lineage])

  return (
    <button className={'btn btn-light'} onClick={download} title={title}>
      <div className="bi bi-download"></div>
      <div className="visually-hidden">{title}</div>
    </button>
  )
}
