import allContributors, { ContributorData } from 'json-loader!src/../../.all-contributorsrc' // eslint-disable-line import/no-extraneous-dependencies

export function getContributors(): ContributorData[] {
  return allContributors.contributors
}
