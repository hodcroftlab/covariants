import dynamic from 'next/dynamic'

const GifPlayer = dynamic(() => import('react-gif-player'), { ssr: false })

export default GifPlayer
