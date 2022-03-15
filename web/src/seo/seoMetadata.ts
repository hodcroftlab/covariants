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
  '/variant/20I.Alpha.V1': {
    name: `${PROJECT_NAME}: 20I (Alpha, V1)`,
    description: `${PROJECT_NAME}: Variant 20I (Alpha, V1)`,
  },
  '/variant/20H.Beta.V2': {
    name: `${PROJECT_NAME}: 20H (Beta, V2)`,
    description: `${PROJECT_NAME}: Variant 20H (Beta, V2)`,
  },
  '/variant/20J.Gamma.V3': {
    name: `${PROJECT_NAME}: 20J (Gamma, V3)`,
    description: `${PROJECT_NAME}: Variant 20J (Gamma, V3)`,
  },
  '/variant/21A.Delta': {
    name: `${PROJECT_NAME}: 21A (Delta)`,
    description: `${PROJECT_NAME}: Variant 21A (Delta)`,
  },
  '/variant/21I.Delta': {
    name: `${PROJECT_NAME}: 21I (Delta)`,
    description: `${PROJECT_NAME}: Variant 21I (Delta)`,
  },
  '/variant/21J.Delta': {
    name: `${PROJECT_NAME}: 21J (Delta)`,
    description: `${PROJECT_NAME}: Variant 21J (Delta)`,
  },
  '/variant/21K.Omicron': {
    name: `${PROJECT_NAME}: 21K (Omicron)`,
    description: `${PROJECT_NAME}: Variant 21K (Omicron)`,
  },
  '/variant/21L.Omicron': {
    name: `${PROJECT_NAME}: 21L (Omicron)`,
    description: `${PROJECT_NAME}: Variant 21L (Omicron)`,
  },
  '/variant/21B.Kappa': {
    name: `${PROJECT_NAME}: 21B (Kappa)`,
    description: `${PROJECT_NAME}: Variant 21B (Kappa)`,
  },
  '/variant/21D.Eta': {
    name: `${PROJECT_NAME}: 21D (Eta)`,
    description: `${PROJECT_NAME}: Variant 21D (Eta)`,
  },
  '/variant/21F.Iota': {
    name: `${PROJECT_NAME}: 21F (Iota)`,
    description: `${PROJECT_NAME}: Variant 21F (Iota)`,
  },
  '/variant/21G.Lambda': {
    name: `${PROJECT_NAME}: 21G (Lambda)`,
    description: `${PROJECT_NAME}: Variant 21G (Lambda)`,
  },
  '/variant/21H.Mu': {
    name: `${PROJECT_NAME}: 21H (Mu)`,
    description: `${PROJECT_NAME}: Variant 21H (Mu)`,
  },
  '/variant/20B.S.732A': {
    name: `${PROJECT_NAME}: 20B/S:732A`,
    description: `${PROJECT_NAME}: Variant 20B/S:732A`,
  },
  '/variant/20A.S.126A': {
    name: `${PROJECT_NAME}: 20A/S:126A`,
    description: `${PROJECT_NAME}: Variant 20A/S:126A`,
  },
  '/variant/20A.EU1': {
    name: `${PROJECT_NAME}: 20E (EU1)`,
    description: `${PROJECT_NAME}: Variant 20E (EU1)`,
  },
  '/variant/21C.Epsilon': {
    name: `${PROJECT_NAME}: 21C (Epsilon)`,
    description: `${PROJECT_NAME}: Variant 21C (Epsilon)`,
  },
  '/variant/S.N439K': {
    name: `${PROJECT_NAME}: 20A/S:439K`,
    description: `${PROJECT_NAME}: Variant 20A/S:439K`,
  },
  '/variant/S.Q677H.Robin1': {
    name: `${PROJECT_NAME}: S:677H.Robin1`,
    description: `${PROJECT_NAME}: Variant S:677H.Robin1`,
  },
  '/variant/S.Q677P.Pelican': {
    name: `${PROJECT_NAME}: S:677P.Pelican`,
    description: `${PROJECT_NAME}: Variant S:677P.Pelican`,
  },
  '/variant/20A.EU2': {
    name: `${PROJECT_NAME}: 20A.EU2`,
    description: `${PROJECT_NAME}: Variant 20A.EU2`,
  },
  '/variant/S.S98F': {
    name: `${PROJECT_NAME}: 20A/S:98F`,
    description: `${PROJECT_NAME}: Variant 20A/S:98F`,
  },
  '/variant/S.D80Y': {
    name: `${PROJECT_NAME}: 20C/S:80Y`,
    description: `${PROJECT_NAME}: Variant 20C/S:80Y`,
  },
  '/variant/S.A626S': {
    name: `${PROJECT_NAME}: 20B/S:626S`,
    description: `${PROJECT_NAME}: Variant 20B/S:626S`,
  },
  '/variant/S.V1122L': {
    name: `${PROJECT_NAME}: 20B/S:1122L`,
    description: `${PROJECT_NAME}: Variant 20B/S:1122L`,
  },
  '/mutation/S.N501': {
    name: `${PROJECT_NAME}: S:N501`,
    description: `${PROJECT_NAME}: Mutation S:N501`,
  },
  '/mutation/S.E484': {
    name: `${PROJECT_NAME}: S:E484`,
    description: `${PROJECT_NAME}: Mutation S:E484`,
  },
  '/mutation/S.H69-': {
    name: `${PROJECT_NAME}: S:H69-`,
    description: `${PROJECT_NAME}: Mutation S:H69-`,
  },
  '/mutation/S.Q677': {
    name: `${PROJECT_NAME}: S:Q677`,
    description: `${PROJECT_NAME}: Mutation S:Q677`,
  },
  '/mutation/S.Y453F': {
    name: `${PROJECT_NAME}: S:Y453F`,
    description: `${PROJECT_NAME}: Mutation S:Y453F`,
  },
  '/mutation/S.S477': {
    name: `${PROJECT_NAME}: S:S477`,
    description: `${PROJECT_NAME}: Mutation S:S477`,
  },
  '/mutation/S.L18': {
    name: `${PROJECT_NAME}: S:L18`,
    description: `${PROJECT_NAME}: Mutation S:L18`,
  },
  '/mutation/S.Y144-': {
    name: `${PROJECT_NAME}: S:Y144-`,
    description: `${PROJECT_NAME}: Mutation S:Y144-`,
  },
  '/mutation/S.K417': {
    name: `${PROJECT_NAME}: S:K417`,
    description: `${PROJECT_NAME}: Mutation S:K417`,
  },
  '/mutation/S.H655': {
    name: `${PROJECT_NAME}: S:H655`,
    description: `${PROJECT_NAME}: Mutation S:H655`,
  },
  '/mutation/S.P681': {
    name: `${PROJECT_NAME}: S:P681`,
    description: `${PROJECT_NAME}: Mutation S:P681`,
  },
  '/mutation/ORF1a.S3675': {
    name: `${PROJECT_NAME}: ORF1a:S3675`,
    description: `${PROJECT_NAME}: Mutation ORF1a:S3675`,
  },
}
