import React from 'react'
import { styled } from 'styled-components'
import { Table } from 'reactstrap'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { LineageBadge, VariantBadge } from 'src/components/Common/MutationBadge'
import { joinWithCommas } from 'src/helpers/join'
import { LinkSmart } from 'src/components/Link/LinkSmart'
import { DefiningMutationCluster } from 'src/io/getDefiningMutationsClusters'

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
`

const Li = styled.li`
  margin: 0;
`

export const InfoTable = styled(Table)`
  max-width: 1000px;

  & td {
    padding: 0.25rem 0.5rem;
    min-width: 200px;
  }

  * {
    border: none !important;
  }
`

export function DefiningMutationsInfo({ currentCluster }: { currentCluster: DefiningMutationCluster }) {
  const { t } = useTranslationSafe()

  const cladeSafe = encodeURI(currentCluster.nextstrainClade)
  const lineageSafe = encodeURI(currentCluster.lineage)

  const urlPerCountry = `/per-country?variant=${cladeSafe}`
  const urlPerVariant = `/per-variant?variant=${cladeSafe}`
  const urlNextstrainClade = `https://nextstrain.org/ncov/gisaid/global/6m?f_clade_membership=${cladeSafe}`
  const urlCovSpectrumLineage = `https://cov-spectrum.org/explore/World/AllSamples/Past6M/variants?nextcladePangoLineage=${lineageSafe}`
  const urlCovSpectrumClade = `https://cov-spectrum.org/explore/World/AllSamples/Past6M/variants?nextstrainClade=${cladeSafe}`

  return (
    <InfoTable>
      <tbody>
        <tr>
          <td className="font-weight-bold">{t('Nextstrain clade')}</td>
          <td>{currentCluster.nextstrainClade ? <VariantBadge name={currentCluster.nextstrainClade} /> : 'none'}</td>
        </tr>
        <tr>
          <td className="font-weight-bold">{t('Unaliased lineage')}</td>
          <td>{currentCluster.unaliased ? <LineageBadge name={currentCluster.unaliased} /> : 'none'}</td>
        </tr>
        <tr>
          <td className="font-weight-bold">{t('Parent lineage')}</td>
          <td>{currentCluster.parent ? <LineageBadge name={currentCluster.parent} /> : 'none'}</td>
        </tr>
        <tr>
          <td className="font-weight-bold">{t('Child lineages')}</td>
          <td>
            {joinWithCommas(
              (currentCluster.children ?? ['none']).map((child) => <LineageBadge key={child} name={child} />),
            )}
          </td>
        </tr>
        <tr>
          <td className="font-weight-bold">{t('Designation date')}</td>
          <td>{currentCluster.designationDate}</td>
        </tr>
        <tr>
          <td className="font-weight-bold">{t('Designation issue')}</td>
          <td>{currentCluster.designationIssue}</td>
        </tr>
        <tr>
          <td className="font-weight-bold">{t('Links')}</td>
          <td className="d-flex">
            <Ul>
              <Li>
                <LinkSmart href={urlPerCountry}>
                  {t('CoVariants - Per country - Clade {{name}}', { name: currentCluster.nextstrainClade })}
                </LinkSmart>
              </Li>
              <Li>
                <LinkSmart href={urlPerVariant}>
                  {t('CoVariants - Per variant - Clade {{name}}', { name: currentCluster.nextstrainClade })}
                </LinkSmart>
              </Li>
              <Li>
                <LinkSmart href={urlNextstrainClade}>
                  {t('Nextstrain - Clade {{name}}', { name: currentCluster.nextstrainClade })}
                </LinkSmart>
              </Li>
              <Li>
                <LinkSmart href={urlCovSpectrumClade}>
                  {t('CoV Spectrum - Clade {{name}}', { name: currentCluster.nextstrainClade })}
                </LinkSmart>
              </Li>
              <Li>
                <LinkSmart href={urlCovSpectrumLineage}>
                  {t('CoV Spectrum - Lineage {{name}}', { name: currentCluster.lineage })}
                </LinkSmart>
              </Li>
            </Ul>
          </td>
        </tr>
      </tbody>
    </InfoTable>
  )
}
