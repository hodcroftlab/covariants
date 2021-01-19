export const PROJECT_NAME = 'CoVariants' as const
export const PROJECT_DESCRIPTION = 'SARS-CoV-2 Mutations and Variants of Interest' as const
export const COPYRIGHT_YEAR_START = 2020 as const
export const COMPANY_NAME = 'Emma Hodcroft' as const

export const DOMAIN = process.env.DOMAIN ?? ''
export const URL_FAVICON = `${DOMAIN}/favicon.ico`
export const URL_SOCIAL_IMAGE = `${DOMAIN}/social-1200x600.png`
export const URL_MANIFEST_JSON = `${DOMAIN}/manifest.json`

export const URL_GITHUB = 'https://github.com/hodcroftlab/covariants' as const
export const URL_GITHUB_FRIENDLY = 'github.com/hodcroftlab/covariants' as const

export const TWITTER_USERNAME_RAW = 'firefoxx66' as const
export const TWITTER_USERNAME_FRIENDLY = `@${TWITTER_USERNAME_RAW}`
