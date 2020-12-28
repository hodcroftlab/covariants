import dynamic from 'next/dynamic'

import { CountryDistributionPage } from 'src/components/CountryDistribution/CountryDistributionPage'

export default dynamic(() => Promise.resolve(CountryDistributionPage), { ssr: false })
