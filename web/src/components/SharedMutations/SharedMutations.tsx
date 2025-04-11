import React, { Suspense } from 'react'

import { ErrorBoundary } from 'react-error-boundary'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { MdxContent } from 'src/i18n/getMdxContent'
import { CenteredEditable, Editable } from 'src/components/Common/Editable'
import { LOADING } from 'src/components/Loading/Loading'
import { FetchError } from 'src/components/Error/FetchError'
import { SharedMutationsTable } from 'src/components/SharedMutations/SharedMutationsTable'

export function SharedMutations() {
  const { t } = useTranslationSafe()

  return (
    <div>
      <CenteredEditable githubUrl="blob/master/content/SharedMutations.md">
        <MdxContent filepath="SharedMutations.mdx" />
      </CenteredEditable>

      <Editable githubUrl="blob/master/scripts" text={t('View data generation scripts')}>
        <div className="d-block flex-shrink-0 overflow-x-auto">
          <ErrorBoundary FallbackComponent={FetchError}>
            <Suspense fallback={LOADING}>
              <SharedMutationsTable />
            </Suspense>
          </ErrorBoundary>
        </div>
      </Editable>
    </div>
  )
}
