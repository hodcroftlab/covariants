import React from 'react'

import { UncontrolledAlert } from 'reactstrap'
import get from 'lodash/get'

import { LinkExternal } from 'src/components/Link/LinkExternal'
import { URL_GITHUB } from 'src/constants'

export function getErrorDetails(error: unknown) {
  let name: string | undefined
  let message: string | undefined
  let url: string | undefined
  if (error instanceof Error) {
    ;({ name, message } = error)
    const urlMaybe: unknown = get(error, 'config.url')
    if (typeof urlMaybe === 'string' && urlMaybe.length > 0) {
      url = urlMaybe
    }
  } else if (typeof error === 'string') {
    name = 'Error'
    message = error
  } else {
    name = 'UnknownError'
    message = 'Unknown error has occurred'
  }

  return { name, message, url }
}

export function AcknowledgementsError({ error }: { error: unknown }) {
  const { name, message, url } = getErrorDetails(error)

  return (
    <UncontrolledAlert color="danger" fade={false} closeClassName="d-none">
      <h4>{'Error has occurred'}</h4>
      <p>
        {url && `Attempted to fetch acknowledgements data from "${url}", but received an error:`}
        <br />
        {`${name}: ${message}`}
      </p>
      <p>
        {"If you believe it's a bug, please report it to developers, but creating a new issue on "}
        <LinkExternal href={`${URL_GITHUB}/issues`}>{'GitHub'}</LinkExternal>
      </p>
    </UncontrolledAlert>
  )
}
