import React, { useMemo, useState, useCallback } from 'react'

import Axios from 'axios'
import { get } from 'lodash'
import { useQuery } from 'react-query'
import { AcknowledgementsError } from 'src/components/Acknowledgements/AcknowledgementsError'
import styled from 'styled-components'
import { Popover as PopoverBase, PopoverBody as PopoverBodyBase, PopoverHeader as PopoverHeaderBase } from 'reactstrap'
import { ThreeDots as ThreeDotsLoader } from 'react-loader-spinner'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

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
`

export interface AcknowledgementEpiIslDatum {
  origLab: string
  submLab: string
  authors: string
}

export function getEpiIslUrl(epiIsl: string) {
  const accessionIdComponents = epiIsl.split('_')
  if (accessionIdComponents.length < 3) {
    return undefined
  }

  const id = accessionIdComponents[2]
  if (id.length < 4) {
    return undefined
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
  const url: string | undefined = useMemo(() => getEpiIslUrl(epiIsl), [epiIsl])

  return useQuery(
    ['acknowledgement_data', epiIsl],
    async () => {
      if (!url) {
        throw new Error(
          `Unable to fetch acknowledgements data from GISAID: Unable to construct request URL: EPI ISL is incorrect: "${epiIsl}"`,
        )
      }
      const res = await Axios.get(url)
      if (!res.data) {
        throw new Error(
          `Unable to fetch acknowledgements data from GISAID: request to URL "${url}" resulted in no data`,
        )
      }
      return validateEpiIslData(res.data)
    },
    {
      staleTime: Number.POSITIVE_INFINITY,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: Number.POSITIVE_INFINITY,
    },
  )
}

export interface AcknowledgementEpiIslPopupProps {
  target: string
  isOpen: boolean
  epiIsl: string
}

export function AcknowledgementEpiIslPopup({ target, isOpen, epiIsl }: AcknowledgementEpiIslPopupProps) {
  const { t } = useTranslationSafe()
  const { isLoading, isFetching, isError, data, error } = useQueryAcknowledgementData(epiIsl)

  return (
    <Popover isOpen={isOpen} target={target} placement="auto">
      <PopoverHeader>
        <PopoverHeaderText>{`GISAID.org/${epiIsl}`}</PopoverHeaderText>
      </PopoverHeader>
      <PopoverBody>
        {(isLoading || isFetching) && (
          <div className="d-flex">
            <div className="mx-auto">
              <ThreeDotsLoader color="#777" height={100} width={50} />
            </div>
          </div>
        )}
        {isError && error && <AcknowledgementsError error={error} />}
        {data && (
          <section>
            <p>
              <b>{t('Originating lab: {{origLab}}', { origLab: '' })}</b>
              <span>{data.origLab}</span>
            </p>
            <p>
              <b>{t('Submitting lab: {{submLab}}', { submLab: '' })}</b>
              <span>{data.submLab}</span>
            </p>
            <p>
              <b>{t('Authors: {{authors}}', { authors: '' })}</b>
              <span>{data.authors}</span>
            </p>
          </section>
        )}
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
  const id = useMemo(() => CSS.escape(epiIsl), [epiIsl])
  const handleMouseOver = useCallback(() => setPopoverOpen(true), [])
  const handleMouseLeave = useCallback(() => setPopoverOpen(false), [])

  return (
    <span>
      <EpiIslText
        id={id}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseOver}
        onBlur={handleMouseLeave}
      >
        {epiIsl}
      </EpiIslText>
      {popoverOpen && <AcknowledgementEpiIslPopup target={id} epiIsl={epiIsl} isOpen={popoverOpen} />}
    </span>
  )
}
