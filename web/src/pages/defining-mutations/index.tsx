import dynamic from 'next/dynamic'

export default dynamic(async () => import('src/components/DefiningMutations/DefiningMutationsPage'), {
  ssr: false,
})
