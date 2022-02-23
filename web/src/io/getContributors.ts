import allContributors, { ContributorData } from 'json-loader!src/../../.all-contributorsrc'

export function getContributors(): ContributorData[] {
  return allContributors.contributors
}
