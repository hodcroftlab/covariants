import React from 'react'

import { Col, Row } from 'reactstrap'

import { ClusterButtonPanelLayout } from '../ClusterButtonPanel/ClusterButtonPanelLayout'
import { MdxContent } from 'src/i18n/getMdxContent'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { Editable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'
import { PageHeading } from 'src/components/Common/PageHeading'
import { getContentGithubUrl } from 'src/helpers/getContentGithubUrl'

export function VariantsPageIndex() {
  const { t } = useTranslationSafe()

  const variantsPageIntroFilename = 'VariantsPageIntro.mdx'

  return (
    <Layout>
      <NarrowPageContainer>
        <Row className={'gx-0'}>
          <Col>
            <PageHeading>{t('Overview of Variants/Mutations')}</PageHeading>
          </Col>
        </Row>

        <Row className={'gx-0'}>
          <Col>
            <ClusterButtonPanelLayout>
              <Editable githubUrl={getContentGithubUrl({ filename: variantsPageIntroFilename })}>
                <MdxContent filepath={variantsPageIntroFilename} />
              </Editable>
            </ClusterButtonPanelLayout>
          </Col>
        </Row>
      </NarrowPageContainer>
    </Layout>
  )
}
