/* eslint-disable camelcase */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { contributors } from 'src/../../.all-contributorsrc'

export interface ContributorData {
  login: string
  name: string
  avatar_url: string
  profile: string
  contributions: string[]
}

export function getContributors(): ContributorData[] {
  return contributors
}
