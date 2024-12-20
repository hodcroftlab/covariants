import React from 'react'
import { UncontrolledAlert } from 'reactstrap'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { URL_GITHUB } from 'src/constants'
import { getErrorDetails } from 'src/components/Acknowledgements/AcknowledgementsError'

export function FetchError({ error }: { error: unknown }) {
  const { name, message, url } = getErrorDetails(error)

  return (
    <UncontrolledAlert color="danger" fade={false} closeClassName="d-none">
      <h4>{'Unable to fetch data'}</h4>
      <p>
        {url && `Attempted to fetch data from "${url}", but received an error:`}
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
