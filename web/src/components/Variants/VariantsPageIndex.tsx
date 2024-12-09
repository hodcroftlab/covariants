import React from 'react'

import { Col, Row } from 'reactstrap'

import { ClusterButtonPanelLayout } from '../ClusterButtonPanel/ClusterButtonPanelLayout'
import { MdxContent } from 'src/i18n/getMdxContent'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { NarrowPageContainer } from 'src/components/Common/ClusterSidebarLayout'
import { Editable } from 'src/components/Common/Editable'
import { Layout } from 'src/components/Layout/Layout'
import { PageHeading } from 'src/components/Common/PageHeading'

export function VariantsPageIndex() {
  const { t } = useTranslationSafe()

  return (
    <Layout>
      <NarrowPageContainer>
        <Row noGutters>
          <Col>
            <PageHeading>{t('Overview of Variants/Mutations')}</PageHeading>
          </Col>
        </Row>

        <Row noGutters>
          <Col>
            <ClusterButtonPanelLayout>
              <Editable githubUrl="blob/master/content/VariantsPageIntro.md">
                <MdxContent filepath="VariantsPageIntro.md" />
              </Editable>
            </ClusterButtonPanelLayout>
          </Col>
        </Row>
      </NarrowPageContainer>
    </Layout>
  )
}
