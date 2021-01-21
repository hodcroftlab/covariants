export const PROJECT_NAME = 'CoVariants' as const
export const PROJECT_DESCRIPTION = 'SARS-CoV-2 Mutations and Variants of Interest' as const
export const COPYRIGHT_YEAR_START = 2020 as const
export const COMPANY_NAME = 'Emma Hodcroft' as const

export const DOMAIN = process.env.DOMAIN ?? ''
export const DOMAIN_STRIPPED = process.env.DOMAIN_STRIPPED ?? ''
export const URL_FAVICON = `${DOMAIN}/favicon.ico`
export const URL_SOCIAL_IMAGE = 'social-1200x630.png'
export const SOCIAL_IMAGE_WIDTH = '1200'
export const SOCIAL_IMAGE_HEIGHT = '630'
export const URL_MANIFEST_JSON = `${DOMAIN}/manifest.json`

export const URL_GITHUB = 'https://github.com/hodcroftlab/covariants' as const
export const URL_GITHUB_FRIENDLY = 'github.com/hodcroftlab/covariants' as const

export const TWITTER_USERNAME_RAW = 'firefoxx66' as const
export const TWITTER_USERNAME_FRIENDLY = `@${TWITTER_USERNAME_RAW}`
export const TWITTER_HASHTAGS = [PROJECT_NAME]
export const TWITTER_RELATED = [TWITTER_USERNAME_RAW]

export const FACEBOOK_HASHTAG = PROJECT_NAME
