import React from 'react'

import { getDefaultCluster } from 'src/io/getClusters'
import { VariantsPage } from 'src/components/Variants/VariantsPage'

const defaultCluster = getDefaultCluster()

export default function Impl() {
  return <VariantsPage defaultCluster={defaultCluster} />
}
