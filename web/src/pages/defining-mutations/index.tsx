import dynamic from 'next/dynamic'

export default dynamic(async () => import('src/components/DefiningMutations/DefiningMutationsIndexPage'), {
  ssr: false,
})
