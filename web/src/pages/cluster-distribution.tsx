import dynamic from 'next/dynamic'

import { ClusterDistributionPage } from 'src/components/ClusterDistribution/ClusterDistributionPage'

export default dynamic(() => Promise.resolve(ClusterDistributionPage), { ssr: false })
