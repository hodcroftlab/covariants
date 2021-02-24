import React, { useEffect, useReducer, useMemo, useState, useCallback } from 'react'

import Axios from 'axios'
import { get } from 'lodash'
import styled from 'styled-components'
import { Popover as PopoverBase, PopoverBody as PopoverBodyBase, PopoverHeader as PopoverHeaderBase } from 'reactstrap'
import Loader from 'react-loader-spinner'

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

export interface FetchEpiIslState {
  status: 'idle' | 'fetching' | 'fetched' | 'error'
  error?: string
  data?: AcknowledgementEpiIslDatum
}

export type FetchEpiIslAction =
  | { type: 'FETCHING' }
  | { type: 'FETCHED'; data: AcknowledgementEpiIslDatum }
  | { type: 'FETCH_ERROR'; error: string }
  | { type: 'FETCH_CANCEL' }

export const useFetchEpiIsl = (epiIsl: string) => {
  const url: string | undefined = useMemo(() => getEpiIslUrl(epiIsl), [epiIsl])

  const initialState: FetchEpiIslState = {
    status: 'idle',
    error: undefined,
    data: undefined,
  }

  const [state, dispatch] = useReducer((state: FetchEpiIslState, action: FetchEpiIslAction): FetchEpiIslState => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' }
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: action.data }
      case 'FETCH_ERROR':
        return { ...initialState, status: 'error', error: action.error }
      case 'FETCH_CANCEL':
        return { ...initialState, status: 'error', error: 'Request cancelled' }
      default:
        return state
    }
  }, initialState)

  useEffect(() => {
    let cancelRequest = false

    function cleanup() {
      cancelRequest = true
    }

    if (!url) {
      dispatch({ type: 'FETCH_ERROR', error: `EPI_ISL is not recognized ${epiIsl}` })
      return cleanup
    }

    const fetchData = async () => {
      dispatch({ type: 'FETCHING' })
      try {
        const response = await Axios.get(url)
        const data = validateEpiIslData(await response.data)
        if (cancelRequest) {
          return
        }
        dispatch({ type: 'FETCHED', data })
      } catch (error: unknown) {
        if (cancelRequest) {
          return
        }
        if (error instanceof Error) {
          dispatch({ type: 'FETCH_ERROR', error: error.message })
        } else {
          dispatch({ type: 'FETCH_ERROR', error: `Unknown error: Details: ${JSON.stringify(error)}` })
        }
      }
    }

    void fetchData() // eslint-disable-line no-void
    return cleanup
  }, [epiIsl, url])

  return state
}

export interface AcknowledgementEpiIslPopupProps {
  target: string
  isOpen: boolean
  epiIsl: string
}

export function AcknowledgementEpiIslPopup({ target, isOpen, epiIsl }: AcknowledgementEpiIslPopupProps) {
  const { status, data, error } = useFetchEpiIsl(epiIsl)

  return (
    <Popover isOpen={isOpen} target={target} placement="auto">
      <PopoverHeader>
        <PopoverHeaderText>{`GISAID.org/${epiIsl}`}</PopoverHeaderText>
      </PopoverHeader>
      <PopoverBody>
        {status === 'error' && error && <p className="text-danger">{`Error: ${error}`}</p>}
        {status === 'fetching' && (
          <div className="d-flex">
            <div className="mx-auto">
              <Loader type="ThreeDots" color="#777" height={100} width={50} timeout={3000} />
            </div>
          </div>
        )}
        {status === 'fetched' && data && (
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
