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
  image: defaultImage.src,
}

export const SEO_OVERRIDES: Record<string, PageMetadata> = {
  '/faq': {
    name: `${PROJECT_NAME}: FAQ`,
    description: `${PROJECT_NAME}: Frequently Asked Questions`,
    image: faqImage.src,
  },
}
