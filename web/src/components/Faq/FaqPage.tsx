import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { MdxContent } from 'src/i18n/getMdxContent'
import { CenteredEditable } from 'src/components/Common/Editable'
import { PageHeading } from 'src/components/Common/PageHeading'
import { Layout } from 'src/components/Layout/Layout'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

export function FaqPage() {
  const { t } = useTranslationSafe()

  return (
    <Layout>
      <Container>
        <Row className={'gx-0'}>
          <Col>
            <PageHeading>{t('Frequently asked questions')}</PageHeading>
          </Col>
        </Row>

        <Row className={'gx-0'}>
          <Col>
            <CenteredEditable githubUrl="blob/master/content/Faq.md">
              <MdxContent filepath="Faq.md" />
            </CenteredEditable>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
