import { PROJECT_DESCRIPTION, PROJECT_NAME } from 'src/constants'

import defaultImage from 'src/assets/social/social-1200x630.png'
import faqImage from 'src/assets/social/social-1200x630-faq.png'

export interface PageMetadata {
  name?: string
  description?: string
  image?: string
}

export const SEO_DEFAULT: PageMetadata = {
  name: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  image: defaultImage,
}

export const SEO_OVERRIDES: Record<string, PageMetadata> = {
  '/faq': {
    name: `${PROJECT_NAME}: FAQ`,
    description: `${PROJECT_NAME}: Frequently Asked Questions`,
    image: faqImage,
  },
  '/variants': {
    name: `${PROJECT_NAME}: Variants`,
    description: `${PROJECT_NAME}: Overview of Variants`,
  },
  '/per-country': {
    name: `${PROJECT_NAME}: Per Country`,
    description: `${PROJECT_NAME}: Plots of Frequencies by Country`,
  },
  '/per-variant': {
    name: `${PROJECT_NAME}: Per Variant`,
    description: `${PROJECT_NAME}: Plots of Frequencies by Variant`,
  },
  '/shared-mutations': {
    name: `${PROJECT_NAME}: Shared Mutations`,
    description: `${PROJECT_NAME}: Shared Mutations`,
  },
  '/acknowledgements': {
    name: `${PROJECT_NAME}: Acknowledgements`,
    description: `${PROJECT_NAME}: Acknowledgements`,
  },
}
