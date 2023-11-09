import unique from 'fork-ts-checker-webpack-plugin/lib/utils/array/unique'
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { get } from 'lodash'
import { Col, Row, Input, Label, Table, Form as FormBase, FormGroup as FormGroupBase } from 'reactstrap'
import { AaMut, LineageBadge, NucMut, VariantLinkBadge } from 'src/components/Common/MutationBadge'
import { parsePositionOrThrow } from 'src/components/Common/parsePosition'
import { LinkSmart } from 'src/components/Link/LinkSmart'
import styled from 'styled-components'
import { getClusters } from 'src/io/getClusters'
import { TableSlimWithBorders } from 'src/components/Common/TableSlim'
import { DefMutLineageTitle } from 'src/components/DefiningMutations/DefMutLineageTitle'
import { useRouter } from 'next/router'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { MdxContent } from 'src/i18n/getMdxContent'
import {
  useDefMutCluster,
  getDefMutClusterRedirects,
  DefMutClusterDatum,
  DefMutAa,
  DefMutNuc,
} from 'src/io/getDefiningMutationsClusters'
import { Layout } from 'src/components/Layout/Layout'
import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'

const clusterRedirects = getDefMutClusterRedirects()
const clusters = getClusters()

export function useCurrentClusterName(clusterName?: string) {
  const router = useRouter()

  if (clusterName) {
    const clusterNewName = get(clusterRedirects, clusterName)
    if (clusterNewName) {
      void router.replace(`/defining-mutations/${clusterNewName}`) // eslint-disable-line no-void
      return clusterNewName
    }
  }

  if (!clusterName) {
    throw new Error(`Clade or lineage not found`)
  }

  return clusterName
}

export interface DefiningMutationsPageProps {
  clusterName?: string
}

export default function DefiningMutationsPage({ clusterName: clusterNameUnsafe }: DefiningMutationsPageProps) {
  const clusterName = useCurrentClusterName(clusterNameUnsafe)
  const currentCluster = useDefMutCluster(clusterName)

  return (
    <Layout>
      <NarrowPageContainer>
        <Row noGutters>
          <Col>
            <DefMutLineageTitle cluster={currentCluster} />
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <MdxContent filepath="DefiningMutationsVariantIntro.mdx" />
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <DefiningMutationsInfo currentCluster={currentCluster} />
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <DefiningMutationsTableWithTargets currentCluster={currentCluster} />
          </Col>
        </Row>
      </NarrowPageContainer>
    </Layout>
  )
}

export const InfoTable = styled(Table)`
  flex: 0;
  max-width: 600px;

  & td {
    padding: 0.25rem 0.5rem;
  }
`

export interface DefiningMutationsInfoProps {
  currentCluster: DefMutClusterDatum
}

export function DefiningMutationsInfo({ currentCluster }: DefiningMutationsInfoProps) {
  const { t } = useTranslationSafe()

  const lineageSafe = encodeURI(currentCluster.lineage)
  const urlCovSpectrumLineage = `https://cov-spectrum.org/explore/World/AllSamples/Past6M/variants?nextcladePangoLineage=${lineageSafe}`

  return (
    <InfoTable striped>
      <tbody>
        <tr>
          <td className="font-weight-bold">{t('Nextstrain clade')}</td>
          <td>
            {currentCluster.cluster?.display_name ? (
              <VariantLinkBadge name={currentCluster.cluster?.display_name} />
            ) : (
              'none'
            )}
          </td>
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
            <LinkSmart href={urlCovSpectrumLineage}>
              {t('CoV Spectrum - Lineage {{name}}', { name: currentCluster.lineage })}
            </LinkSmart>
          </td>
        </tr>
      </tbody>
    </InfoTable>
  )
}

export interface DefiningMutationsTableWithTargetsProps {
  currentCluster: DefMutClusterDatum
}

export function DefiningMutationsTableWithTargets({ currentCluster }: DefiningMutationsTableWithTargetsProps) {
  const targetIds = Object.keys(currentCluster.mutations)
  const [currentTargetId, setCurrentTargetId] = useState<string | undefined>(targetIds[0])

  if (!currentTargetId) {
    return null
  }

  return (
    <Row noGutters>
      <Col>
        <Row noGutters>
          <Col>
            <ComparisonTargetDropdown
              targetIds={targetIds}
              currentTargetId={currentTargetId}
              setCurrentTargetId={setCurrentTargetId}
            />
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <DefiningMutationsTable currentCluster={currentCluster} comparisonTargetName={currentTargetId} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export interface DropdownComparisonTargetProps {
  targetIds: string[]
  currentTargetId: string
  setCurrentTargetId(currentTargetId: string): void
}

export function ComparisonTargetDropdown({
  targetIds,
  currentTargetId,
  setCurrentTargetId,
}: DropdownComparisonTargetProps) {
  const { t } = useTranslationSafe()

  const options = useMemo(
    () =>
      targetIds.map((id) => (
        <option key={id} value={id}>
          {id}
        </option>
      )),
    [targetIds],
  )

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCurrentTargetId(event.target.value)
    },
    [setCurrentTargetId],
  )

  return (
    <Form>
      <FormGroup>
        <Label>
          <span className="my-1">{t('Mutations relative to')}</span>
          <Input className="my-1" type="select" value={currentTargetId} onChange={onChange}>
            {options}
          </Input>
        </Label>
      </FormGroup>
    </Form>
  )
}

export const FormGroup = styled(FormGroupBase)``

export const Form = styled(FormBase)``

export interface DefiningMutationsTableProps {
  currentCluster: DefMutClusterDatum
  comparisonTargetName: string
}

export function DefiningMutationsTable({ currentCluster, comparisonTargetName }: DefiningMutationsTableProps) {
  const { t } = useTranslationSafe()

  const rows = useMemo(() => {
    const mutations = currentCluster.mutations[comparisonTargetName]
    if (!mutations) {
      return []
    }

    const allNucMuts: DefMutNuc[] = Object.entries(mutations.nuc).map(([posStr, nucMut]) => {
      const pos = parsePositionOrThrow(posStr)
      return { pos, ...nucMut }
    })

    const aaMuts: DefMutAa[] = Object.entries(mutations.aa).flatMap(([gene, aaMuts]) =>
      Object.entries(aaMuts).map(([posStr, aaMut]) => {
        const pos = parsePositionOrThrow(posStr)
        const nucMuts = allNucMuts.filter((nucMut) => aaMut.nucPos?.includes(nucMut.pos))
        return { gene, pos, ...aaMut, nucMuts }
      }),
    )

    const codingPositions = unique(aaMuts.flatMap((aaMut) => aaMut.nucPos))
    const silentNucMuts = allNucMuts.filter((nucMut) => !codingPositions.includes(nucMut.pos))

    const silentRows = silentNucMuts.map((nucMut) => (
      <DefiningMutationsTableRowSilent key={JSON.stringify(nucMut)} nucMut={nucMut} />
    ))

    const codingRows = aaMuts.map((aaMut) => (
      <DefiningMutationsTableRowCoding key={JSON.stringify(aaMut)} aaMut={aaMut} />
    ))

    return [...codingRows, ...silentRows]
  }, [comparisonTargetName, currentCluster.mutations])

  return (
    <TableSlimWithBorders>
      <thead>
        <tr>
          <th className="text-center">{t('AA Notes')}</th>
          <th className="text-center">{t('AA Mut')}</th>
          <th className="text-center">{t('Nuc Mut')}</th>
          <th className="text-center">{t('Nuc Notes')}</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </TableSlimWithBorders>
  )
}

export interface DefiningMutationsTableRowSilentProps {
  nucMut: DefMutNuc
}

export function DefiningMutationsTableRowSilent({ nucMut }: DefiningMutationsTableRowSilentProps) {
  const mstr = nucMutTostring(nucMut)
  return (
    <tr key={mstr}>
      <DefiningMutationsTableTd />
      <DefiningMutationsTableTdNarrow />
      <DefiningMutationsTableTdNarrow>
        <NucMut mut={mstr} />
      </DefiningMutationsTableTdNarrow>
      <DefiningMutationsTableTd>{nucMut.annotation}</DefiningMutationsTableTd>
    </tr>
  )
}

export interface DefiningMutationsTableRowCodingProps {
  aaMut: DefMutAa
}

export function DefiningMutationsTableRowCoding({ aaMut }: DefiningMutationsTableRowCodingProps) {
  const numNucMuts = aaMut.nucMuts.length

  const components = useMemo(
    () =>
      (aaMut.nucMuts ?? []).map((m, i) => {
        const mstr = nucMutTostring(m)
        return (
          <tr key={mstr}>
            {i === 0 && (
              <>
                <DefiningMutationsTableTd rowSpan={numNucMuts}>{aaMut.annotation}</DefiningMutationsTableTd>
                <DefiningMutationsTableTdNarrow rowSpan={numNucMuts}>
                  <AaMut mut={aaMutToString(aaMut)} />
                </DefiningMutationsTableTdNarrow>
              </>
            )}

            <DefiningMutationsTableTdNarrow>
              <NucMut mut={mstr} />
            </DefiningMutationsTableTdNarrow>
            <DefiningMutationsTableTd>{m.annotation}</DefiningMutationsTableTd>
          </tr>
        )
      }),
    [aaMut, numNucMuts],
  )

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{components}</>
}

const DefiningMutationsTableTdNarrow = styled.td`
  width: 10%;
`

const DefiningMutationsTableTd = styled.td`
  width: 45%;
`

function nucMutTostring({ ref, pos, alt }: DefMutNuc) {
  return `${ref}${pos}${alt}`
}

function aaMutToString({ gene, ref, pos, alt }: DefMutAa) {
  return `${gene}:${ref}${pos}${alt}`
}
