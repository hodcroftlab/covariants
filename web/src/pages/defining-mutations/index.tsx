import dynamic from 'next/dynamic'

export default dynamic(async () => import('src/components/DefiningMutations/Index/DefiningMutationsIndexPage'), {
  ssr: false,
})
