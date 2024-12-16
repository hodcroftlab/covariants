import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

export const mockMutationComparison = {
  individual: [
    {
      index: 0,
      mutations: ['S:A67V', null, null, null, null, null, 'S:K147E', 'S:Q52H', null, null, null, null],
    },
  ],
  // eslint-disable-next-line camelcase
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
  // eslint-disable-next-line camelcase
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

const restHandlers = [
  http.get('/data/mutationComparison.json', () => {
    return HttpResponse.json(mockMutationComparison)
  }),
]

export const server = setupServer(...restHandlers)
