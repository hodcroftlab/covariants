/* eslint-disable camelcase */
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

export const mockMutationComparison = {
  individual: [
    {
      index: 0,
      mutations: ['S:A67V', null, null, null, null, null, 'S:K147E', 'S:Q52H', null, null, null, null],
    },
  ],
  shared_by_commonness: [
    {
      pos: 969,
      presence: [
        'S:N969K',
        'S:N969K',
        'S:N969K',
        'S:N969K',
        'S:N969K',
        'S:N969K',
        'S:N969K',
        'S:N969K',
        'S:N969K',
        'S:N969K',
        'S:N969K',
        'S:N969K',
      ],
    },
  ],
  shared_by_pos: [
    {
      pos: 19,
      presence: [
        null,
        'S:T19I',
        'S:T19I',
        'S:T19I',
        'S:T19I',
        'S:T19I',
        'S:T19I',
        'S:T19I',
        'S:T19I',
        'S:T19I',
        'S:T19I',
        'S:T19I',
      ],
    },
  ],
  variants: [
    '21K (Omicron)\n(BA.1)',
    '21L (Omicron)\n(BA.2)',
    '22A & 22B (Omicron)\n(BA.4&5)',
    '22E (Omicron)\n(BQ.1)',
    '22F (Omicron)\n(XBB)',
    '23A (Omicron)\n(XBB.1.5)',
    '23C (Omicron)\n(CH.1.1)',
    '23H (Omicron)\n(HK.3)',
    '23I (Omicron)\n(BA.2.86)',
    '24A (Omicron)\n(JN.1)',
    '24B (Omicron)\n(JN.1.11.1)',
    '24C (Omicron)\n(KP.3)',
  ],
}

const mockParams = {
  max_date: '2024-09-23',
  min_date: '2020-04-27',
}

const mockPerClusterData = {
  country_names: ['Argentina'],
  distributions: [
    {
      cluster: '20I (Alpha, V1)',
      distribution: [
        {
          frequencies: {
            Argentina: 0.0,
          },
          interp: {
            Argentina: false,
          },
          orig: {
            Argentina: true,
          },
          week: '2020-04-27',
        },
      ],
    },
  ],
}

const mockClusters = {
  clusters: [
    {
      alt_display_name: ['S.501Y.V1'],
      alternative_names: ['VOC 202012/01'],
      aquaria_urls: [
        {
          gene: 'S',
          url: 'https://aquaria.app/SARS-CoV-2/S?H69Del&V70Del&Y144Del&N501Y&A570D&D614G&P681H&T716I&S982A&D1118H',
        },
      ],
      build_name: '20I.Alpha.V1',
      cluster_data: [],
      col: '#D16666',
      country_info: [],
      display_name: '20I (Alpha, V1)',
      graphing: true,
      important: false,
      mutations: {
        nonsynonymous: [
          {
            gene: 'S',
            left: 'H',
            pos: 69,
            right: '-',
          },
        ],
        synonymous: [
          {
            left: 'C',
            pos: 241,
            right: 'T',
          },
        ],
      },
      nextstrain_build: false,
      nextstrain_name: '20I',
      nextstrain_url: 'https://nextstrain.org/groups/neherlab/ncov/20I.Alpha.V1',
      old_build_names: ['S.501Y.V1'],
      pango_lineages: [
        {
          name: 'B.1.1.7',
          url: null,
        },
      ],
      snps: [23_063, 23_604, 24_914],
      snps_with_base: ['23063T', '23604A', '24914C'],
      type: 'variant',
      who_name: ['Alpha'],
    },
  ],
}

const mockCountryStyles = {
  Argentina: {
    c: '#004d00',
    ls: '-.',
  },
}

const restHandlers = [
  http.get('/data/mutationComparison.json', () => {
    return HttpResponse.json(mockMutationComparison)
  }),
  http.get('/data/params.json', () => {
    return HttpResponse.json(mockParams)
  }),
  http.get('/data/perClusterData.json', () => {
    return HttpResponse.json(mockPerClusterData)
  }),
  http.get('/data/clusters.json', () => {
    return HttpResponse.json(mockClusters)
  }),
  http.get('/data/countryStyles.json', () => {
    return HttpResponse.json(mockCountryStyles)
  }),
]

export const server = setupServer(...restHandlers)
