import React from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'
import urljoin from 'url-join'
import { get } from 'lodash'

import { DOMAIN, SOCIAL_IMAGE_HEIGHT, SOCIAL_IMAGE_WIDTH, TWITTER_USERNAME_FRIENDLY } from 'src/constants'
import { SEO_DEFAULT, SEO_OVERRIDES } from 'src/seo/seoMetadata'

const localeFull = 'en-US'

export function SeoApp() {
  const router = useRouter()
  const pathname = router.asPath
  const url = urljoin(DOMAIN, pathname)

  // eslint-disable-next-line prefer-const
  let { name, description, image } = { ...SEO_DEFAULT, ...get(SEO_OVERRIDES, pathname, SEO_DEFAULT) }

  if (image) {
    image = urljoin(DOMAIN, image)
  }

  return (
    <Head>
      <title>{name}</title>

      <meta name="description" content={description} />
      <meta name="application-name" content={name} />

      <meta key="description" itemProp="description" content={description} />
      <meta key="image" itemProp="image" content={image} />
      <meta key="name" itemProp="name" content={name} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:image" property="og:image" content={image} />
      <meta key="og:image:secure_url" property="og:image:secure_url" content={image} />
      <meta key="og:image:type" property="og:image:type" content="image/png" />
      <meta key="og:image:width" property="og:image:width" content={SOCIAL_IMAGE_WIDTH} />
      <meta key="og:image:height" property="og:image:height" content={SOCIAL_IMAGE_HEIGHT} />
      <meta key="og:locale" property="og:locale" content={localeFull} />
      <meta key="og:title" property="og:title" content={name} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={description} />
      <meta name="twitter:title" content={name} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:site" content={TWITTER_USERNAME_FRIENDLY} />
    </Head>
  )
}
