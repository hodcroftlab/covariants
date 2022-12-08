import React, { useMemo, useState, useCallback, Suspense, useRef, RefObject } from 'react'
import { get } from 'lodash'
import styled from 'styled-components'
import { ErrorBoundary } from 'react-error-boundary'
import { Popover as PopoverBase, PopoverBody as PopoverBodyBase, PopoverHeader as PopoverHeaderBase } from 'reactstrap'
import { THREE_DOTS } from 'src/components/Loading/Loading'
import { useAxiosQuery } from 'src/hooks/useAxiosQuery'
import { formatError } from 'src/components/MutationCounts/MutationCountsSummaryCard'

export const Popover = styled(PopoverBase)`
  .popover {
    width: 500px;
    max-width: unset !important;

    @media (max-width: 575.98px) {
      width: 300px;
    }
  }
`

export const PopoverBody = styled(PopoverBodyBase)`
  .popover-inner {
  }
`

export const PopoverHeader = styled(PopoverHeaderBase)`
  display: flex;
`

export const PopoverHeaderText = styled.span`
  font-size: 20px;
  margin: auto;
`

export const EpiIslText = styled.span`
  text-decoration: #777 underline dashed;
  cursor: pointer;
`

export interface AcknowledgementEpiIslDatum {
  origLab: string
  submLab: string
  authors: string
}

export function getEpiIslUrl(epiIsl: string): string {
  const accessionIdComponents = epiIsl.split('_')
  if (accessionIdComponents.length < 3) {
    throw new Error(`Invalid EPI ISL: not enough components: ${epiIsl}`)
  }

  const id = accessionIdComponents[2]
  if (id.length < 4) {
    throw new Error(`Invalid EPI ISL: ID component is too short: ${epiIsl}`)
  }

  const first = id.slice(-4, -2) // 2 characters from the end, skipping the two last
  const second = id.slice(-2) // the last 2 characters
  return `https://www.epicov.org/acknowledgement/${first}/${second}/${epiIsl}.json`
}

function getString(obj: unknown, objPath: string, defaultValue?: string): string {
  const property: string | unknown = get(obj, objPath, defaultValue)
  if (typeof property !== 'string') {
    return defaultValue ?? '-'
  }
  return property
}

export function validateEpiIslData(data: unknown): AcknowledgementEpiIslDatum {
  const origLab = getString(data, 'covv_orig_lab', '-')
  const submLab = getString(data, 'covv_subm_lab', '-')
  const authors = getString(data, 'covv_authors', '-')
  return { origLab, submLab, authors }
}

export function useQueryAcknowledgementData(epiIsl: string) {
  const url = useMemo(() => getEpiIslUrl(epiIsl), [epiIsl])
  const data = useAxiosQuery(url)
  return useMemo(() => validateEpiIslData(data), [data])
}

export interface AcknowledgementEpiIslPopupBodyProps {
  epiIsl: string
}

export function AcknowledgementEpiIslPopupBody({ epiIsl }: AcknowledgementEpiIslPopupBodyProps) {
  const data = useQueryAcknowledgementData(epiIsl)
  return (
    <section>
      <p>
        <b>{'Originating lab: '}</b>
        <span>{data.origLab}</span>
      </p>
      <p>
        <b>{'Submitting lab: '}</b>
        <span>{data.submLab}</span>
      </p>
      <p>
        <b>{'Authors: '}</b>
        <span>{data.authors}</span>
      </p>
    </section>
  )
}

function ErrorFallbackComponent({ error }: { error: unknown }) {
  return (
    <div className="mx-auto">
      <div>{`Unable to fetch acknowledgements: ${formatError(error)}`}</div>
    </div>
  )
}

export interface AcknowledgementEpiIslPopupProps {
  target: RefObject<Element>
  isOpen: boolean
  epiIsl: string
}

export function AcknowledgementEpiIslPopup({ target, isOpen, epiIsl }: AcknowledgementEpiIslPopupProps) {
  return (
    <Popover isOpen={isOpen} target={target} placement="auto">
      <PopoverHeader>
        <PopoverHeaderText>{`GISAID.org/${epiIsl}`}</PopoverHeaderText>
      </PopoverHeader>
      <PopoverBody>
        <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
          <Suspense fallback={THREE_DOTS}>
            <AcknowledgementEpiIslPopupBody epiIsl={epiIsl} />
          </Suspense>
        </ErrorBoundary>
      </PopoverBody>
    </Popover>
  )
}

export interface AcknowledgementEpiIslProps {
  epiIsl: string
}

export function AcknowledgementEpiIsl({ epiIsl }: AcknowledgementEpiIslProps) {
  // Suggested by GISAID:
  // Demo: https://pandemicprepardness.org/demos/popupdemo/popup-demo.html
  // Download: https://pandemicprepardness.org/downloads/GISAID-Acknowledgement-JS-Library.zip
  // Example JSON URL: 'https://www.epicov.org/acknowledgement/49/39/EPI_ISL_1014939.json'

  const [popoverOpen, setPopoverOpen] = useState(false)
  const handleMouseOver = useCallback(() => setPopoverOpen(true), [])
  const handleMouseLeave = useCallback(() => setPopoverOpen(false), [])

  const ref = useRef(null)

  return (
    <span>
      <EpiIslText
        ref={ref}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseOver}
        onBlur={handleMouseLeave}
      >
        {epiIsl}
      </EpiIslText>
      {popoverOpen && <AcknowledgementEpiIslPopup target={ref} epiIsl={epiIsl} isOpen={popoverOpen} />}
    </span>
  )
}
