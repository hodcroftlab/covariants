import { useRouter } from 'next/router'
import React from 'react'

import { get } from 'lodash'
import Head from 'next/head'
import { Helmet } from 'react-helmet'

import { DOMAIN, TWITTER_USERNAME_FRIENDLY } from 'src/constants'
import { SEO_DEFAULT, SEO_OVERRIDES } from 'src/seo/seoMetadata'

const localeFull = 'en-US'
const htmlAttributes = { lang: 'en' }

export function SEO() {
  const router = useRouter()
  const { name, description, image } = { ...SEO_DEFAULT, ...get(SEO_OVERRIDES, router.asPath, SEO_DEFAULT) }

  return (
    <>
      <Helmet htmlAttributes={htmlAttributes} />
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
        <meta key="og:image:width" property="og:image:width" content="1200" />
        <meta key="og:image:height" property="og:image:height" content="600" />
        <meta key="og:locale" property="og:locale" content={localeFull} />
        <meta key="og:title" property="og:title" content={name} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:url" property="og:url" content={DOMAIN} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={description} />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:url" content={DOMAIN} />
        <meta name="twitter:site" content={TWITTER_USERNAME_FRIENDLY} />
      </Head>
    </>
  )
}
