import React, { useMemo } from 'react'

import { ErrorContainer, ErrorMessage } from 'src/components/Error/ErrorStyles'

export function ErrorGeneric({ error }: { error: Error }) {
  const { errorTitle, message } = useMemo(() => {
    const { name, message } = error
    let errorTitle = `An error has occurred: ${name}`
    if (name.toLowerCase().trim() === 'error') {
      errorTitle = 'An error has occurred'
    }
    return { errorTitle, message }
  }, [error])

  return (
    <ErrorContainer>
      <h5>{errorTitle}</h5>
      <ErrorMessage>{message}</ErrorMessage>
    </ErrorContainer>
  )
}
