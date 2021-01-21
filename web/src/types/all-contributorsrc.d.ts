/* eslint-disable camelcase */
declare module '*.all-contributorsrc' {
  export interface ContributorData {
    login: string
    name: string
    avatar_url: string
    profile: string
    contributions: string[]
  }

  const json: { contributors: ContributorData[] }
  export default json
}
