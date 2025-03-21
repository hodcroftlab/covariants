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
  '/variants/20I.Alpha.V1': {
    name: `${PROJECT_NAME}: 20I (Alpha, V1)`,
    description: `${PROJECT_NAME}: Variant 20I (Alpha, V1)`,
  },
  '/variants/20H.Beta.V2': {
    name: `${PROJECT_NAME}: 20H (Beta, V2)`,
    description: `${PROJECT_NAME}: Variant 20H (Beta, V2)`,
  },
  '/variants/20J.Gamma.V3': {
    name: `${PROJECT_NAME}: 20J (Gamma, V3)`,
    description: `${PROJECT_NAME}: Variant 20J (Gamma, V3)`,
  },
  '/variants/21A.Delta': {
    name: `${PROJECT_NAME}: 21A (Delta)`,
    description: `${PROJECT_NAME}: Variant 21A (Delta)`,
  },
  '/variants/21I.Delta': {
    name: `${PROJECT_NAME}: 21I (Delta)`,
    description: `${PROJECT_NAME}: Variant 21I (Delta)`,
  },
  '/variants/21J.Delta': {
    name: `${PROJECT_NAME}: 21J (Delta)`,
    description: `${PROJECT_NAME}: Variant 21J (Delta)`,
  },
  '/variants/21K.Omicron': {
    name: `${PROJECT_NAME}: 21K (Omicron)`,
    description: `${PROJECT_NAME}: Variant 21K (Omicron)`,
  },
  '/variants/21L.Omicron': {
    name: `${PROJECT_NAME}: 21L (Omicron)`,
    description: `${PROJECT_NAME}: Variant 21L (Omicron)`,
  },
  '/variants/22A.Omicron': {
    name: `${PROJECT_NAME}: 22A (Omicron)`,
    description: `${PROJECT_NAME}: Variant 22A (Omicron)`,
  },
  '/variants/22B.Omicron': {
    name: `${PROJECT_NAME}: 22B (Omicron)`,
    description: `${PROJECT_NAME}: Variant 22B (Omicron)`,
  },
  '/variants/22C.Omicron': {
    name: `${PROJECT_NAME}: 22C (Omicron)`,
    description: `${PROJECT_NAME}: Variant 22C (Omicron)`,
  },
  '/variants/22D.Omicron': {
    name: `${PROJECT_NAME}: 22D (Omicron)`,
    description: `${PROJECT_NAME}: Variant 22D (Omicron)`,
  },
  '/variants/22E.Omicron': {
    name: `${PROJECT_NAME}: 22E (Omicron)`,
    description: `${PROJECT_NAME}: Variant 22E (Omicron)`,
  },
  '/variants/22F.Omicron': {
    name: `${PROJECT_NAME}: 22F (Omicron)`,
    description: `${PROJECT_NAME}: Variant 22F (Omicron)`,
  },
  '/variants/23A.Omicron': {
    name: `${PROJECT_NAME}: 23A (Omicron)`,
    description: `${PROJECT_NAME}: Variant 23A (Omicron)`,
  },
  '/variants/23B.Omicron': {
    name: `${PROJECT_NAME}: 23B (Omicron)`,
    description: `${PROJECT_NAME}: Variant 23B (Omicron)`,
  },
  '/variants/23C.Omicron': {
    name: `${PROJECT_NAME}: 23C (Omicron)`,
    description: `${PROJECT_NAME}: Variant 23C (Omicron)`,
  },
  '/variants/23D.Omicron': {
    name: `${PROJECT_NAME}: 23D (Omicron)`,
    description: `${PROJECT_NAME}: Variant 23D (Omicron)`,
  },
  '/variants/23E.Omicron': {
    name: `${PROJECT_NAME}: 23E (Omicron)`,
    description: `${PROJECT_NAME}: Variant 23E (Omicron)`,
  },
  '/variants/23F.Omicron': {
    name: `${PROJECT_NAME}: 23F (Omicron)`,
    description: `${PROJECT_NAME}: Variant 23F (Omicron)`,
  },
  '/variants/23G.Omicron': {
    name: `${PROJECT_NAME}: 23G (Omicron)`,
    description: `${PROJECT_NAME}: Variant 23G (Omicron)`,
  },
  '/variants/23H.Omicron': {
    name: `${PROJECT_NAME}: 23H (Omicron)`,
    description: `${PROJECT_NAME}: Variant 23H (Omicron)`,
  },
  '/variants/23I.Omicron': {
    name: `${PROJECT_NAME}: 23I (Omicron)`,
    description: `${PROJECT_NAME}: Variant 23I (Omicron)`,
  },
  '/variants/24A.Omicron': {
    name: `${PROJECT_NAME}: 24A(Omicron)`,
    description: `${PROJECT_NAME}: Variant 24A (Omicron)`,
  },
  '/variants/24B.Omicron': {
    name: `${PROJECT_NAME}: 24B (Omicron)`,
    description: `${PROJECT_NAME}: Variant 24B (Omicron)`,
  },
  '/variants/24C.Omicron': {
    name: `${PROJECT_NAME}: 24C (Omicron)`,
    description: `${PROJECT_NAME}: Variant 24C (Omicron)`,
  },
  '/variants/21B.Kappa': {
    name: `${PROJECT_NAME}: 21B (Kappa)`,
    description: `${PROJECT_NAME}: Variant 21B (Kappa)`,
  },
  '/variants/21D.Eta': {
    name: `${PROJECT_NAME}: 21D (Eta)`,
    description: `${PROJECT_NAME}: Variant 21D (Eta)`,
  },
  '/variants/21F.Iota': {
    name: `${PROJECT_NAME}: 21F (Iota)`,
    description: `${PROJECT_NAME}: Variant 21F (Iota)`,
  },
  '/variants/21G.Lambda': {
    name: `${PROJECT_NAME}: 21G (Lambda)`,
    description: `${PROJECT_NAME}: Variant 21G (Lambda)`,
  },
  '/variants/21H.Mu': {
    name: `${PROJECT_NAME}: 21H (Mu)`,
    description: `${PROJECT_NAME}: Variant 21H (Mu)`,
  },
  '/variants/20B.S.732A': {
    name: `${PROJECT_NAME}: 20B/S:732A`,
    description: `${PROJECT_NAME}: Variant 20B/S:732A`,
  },
  '/variants/20A.S.126A': {
    name: `${PROJECT_NAME}: 20A/S:126A`,
    description: `${PROJECT_NAME}: Variant 20A/S:126A`,
  },
  '/variants/20A.EU1': {
    name: `${PROJECT_NAME}: 20E (EU1)`,
    description: `${PROJECT_NAME}: Variant 20E (EU1)`,
  },
  '/variants/21C.Epsilon': {
    name: `${PROJECT_NAME}: 21C (Epsilon)`,
    description: `${PROJECT_NAME}: Variant 21C (Epsilon)`,
  },
  '/variants/S.N439K': {
    name: `${PROJECT_NAME}: 20A/S:439K`,
    description: `${PROJECT_NAME}: Variant 20A/S:439K`,
  },
  '/variants/S.Q677H.Robin1': {
    name: `${PROJECT_NAME}: S:677H.Robin1`,
    description: `${PROJECT_NAME}: Variant S:677H.Robin1`,
  },
  '/variants/S.Q677P.Pelican': {
    name: `${PROJECT_NAME}: S:677P.Pelican`,
    description: `${PROJECT_NAME}: Variant S:677P.Pelican`,
  },
  '/variants/20A.EU2': {
    name: `${PROJECT_NAME}: 20A.EU2`,
    description: `${PROJECT_NAME}: Variant 20A.EU2`,
  },
  '/variants/S.S98F': {
    name: `${PROJECT_NAME}: 20A/S:98F`,
    description: `${PROJECT_NAME}: Variant 20A/S:98F`,
  },
  '/variants/S.D80Y': {
    name: `${PROJECT_NAME}: 20C/S:80Y`,
    description: `${PROJECT_NAME}: Variant 20C/S:80Y`,
  },
  '/variants/S.A626S': {
    name: `${PROJECT_NAME}: 20B/S:626S`,
    description: `${PROJECT_NAME}: Variant 20B/S:626S`,
  },
  '/variants/S.V1122L': {
    name: `${PROJECT_NAME}: 20B/S:1122L`,
    description: `${PROJECT_NAME}: Variant 20B/S:1122L`,
  },
  '/variants/S.N501': {
    name: `${PROJECT_NAME}: S:N501`,
    description: `${PROJECT_NAME}: Mutation S:N501`,
  },
  '/variants/S.E484': {
    name: `${PROJECT_NAME}: S:E484`,
    description: `${PROJECT_NAME}: Mutation S:E484`,
  },
  '/variants/S.H69-': {
    name: `${PROJECT_NAME}: S:H69-`,
    description: `${PROJECT_NAME}: Mutation S:H69-`,
  },
  '/variants/S.Q677': {
    name: `${PROJECT_NAME}: S:Q677`,
    description: `${PROJECT_NAME}: Mutation S:Q677`,
  },
  '/variants/S.Y453F': {
    name: `${PROJECT_NAME}: S:Y453F`,
    description: `${PROJECT_NAME}: Mutation S:Y453F`,
  },
  '/variants/S.S477': {
    name: `${PROJECT_NAME}: S:S477`,
    description: `${PROJECT_NAME}: Mutation S:S477`,
  },
  '/variants/S.L18': {
    name: `${PROJECT_NAME}: S:L18`,
    description: `${PROJECT_NAME}: Mutation S:L18`,
  },
  '/variants/S.Y144-': {
    name: `${PROJECT_NAME}: S:Y144-`,
    description: `${PROJECT_NAME}: Mutation S:Y144-`,
  },
  '/variants/S.K417': {
    name: `${PROJECT_NAME}: S:K417`,
    description: `${PROJECT_NAME}: Mutation S:K417`,
  },
  '/variants/S.H655': {
    name: `${PROJECT_NAME}: S:H655`,
    description: `${PROJECT_NAME}: Mutation S:H655`,
  },
  '/variants/S.P681': {
    name: `${PROJECT_NAME}: S:P681`,
    description: `${PROJECT_NAME}: Mutation S:P681`,
  },
  '/variants/ORF1a.S3675': {
    name: `${PROJECT_NAME}: ORF1a:S3675`,
    description: `${PROJECT_NAME}: Mutation ORF1a:S3675`,
  },
}
