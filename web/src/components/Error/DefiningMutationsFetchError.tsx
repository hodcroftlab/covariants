import React from 'react'
import { UncontrolledAlert } from 'reactstrap'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { URL_GITHUB } from 'src/constants'
import { getErrorDetails } from 'src/components/Acknowledgements/AcknowledgementsError'

export function DefiningMutationsFetchError({ error }: { error: unknown }) {
  const { name, message, url } = getErrorDetails(error)

  return (
    <UncontrolledAlert color="secondary" fade={false} closeClassName="d-none">
      <h4>{'No defining mutations found for this cluster'}</h4>
      <p>
        {url && `Attempted to fetch data from "${url}", but received an error:`}
        <br />
        {`${name}: ${message}`}
      </p>
      <p>
        {'We seem to be missing mutation data for this cluster. You can help to provide defining mutations data here '}
        <LinkExternal href={`${URL_GITHUB}/tree/master/defining_mutations`}>{'GitHub'}</LinkExternal>
      </p>
      <p>
        {'There could also be something wrong with the network connection, please check if you have internet access.'}
      </p>
      <p>
        {"If you believe it's a bug, please report it to developers, but creating a new issue on "}
        <LinkExternal href={`${URL_GITHUB}/issues`}>{'GitHub'}</LinkExternal>
      </p>
    </UncontrolledAlert>
  )
}
