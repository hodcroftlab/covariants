import { UncontrolledAlert } from 'reactstrap'
import React from 'react'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { URL_GITHUB } from 'src/constants'

export function DeveloperError({ errorMessage }: { errorMessage: string }) {
  return (
    <UncontrolledAlert color="danger" fade={false} closeClassName="d-none">
      <h1>Error</h1>
      <p>We are sorry. This should not happen. Please visit another page.</p>
      <p>{errorMessage}</p>
      <p>
        {'Please report this bug to developers, by creating a new issue on '}
        <LinkExternal href={`${URL_GITHUB}/issues`}>{'GitHub'}</LinkExternal>
      </p>
    </UncontrolledAlert>
  )
}
