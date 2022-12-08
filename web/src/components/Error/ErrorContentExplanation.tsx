import React from 'react'

import { LinkExternal } from 'src/components/Link/LinkExternal'
import { URL_GITHUB_ISSUES, URL_GITHUB_ISSUES_FRIENDLY } from 'src/constants'

export function ErrorContentExplanation() {
  return (
    <section className="mt-3">
      <span>{'If you think it is a bug, report it at '}</span>
      <span>
        <LinkExternal href={URL_GITHUB_ISSUES}>{URL_GITHUB_ISSUES_FRIENDLY}</LinkExternal>
      </span>
      <span>
        {
          ' so that developers could investigate this problem. Please provide as much details as possible about your input data, operating system, browser version and computer configuration. Include other details you deem useful for diagnostics. Share the example sequence data that allows to reproduce the problem, if possible.'
        }
      </span>
    </section>
  )
}
