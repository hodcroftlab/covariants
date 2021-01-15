import React from 'react'

import { getClusters } from 'src/io/getClusters'
import { VariantsPage } from 'src/components/Variants/VariantsPage'

const clusters = getClusters()
const defaultCluster = clusters[0]

export default function Impl() {
  return <VariantsPage defaultCluster={defaultCluster} />
}
