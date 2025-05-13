import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { MdxContent } from 'src/i18n/getMdxContent'
import { CenteredEditable } from 'src/components/Common/Editable'
import { PageHeading } from 'src/components/Common/PageHeading'
import { Layout } from 'src/components/Layout/Layout'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { getContentGithubUrl } from 'src/helpers/getContentGithubUrl'

export function FaqPage() {
  const { t } = useTranslationSafe()

  const faqFilename = 'Faq.mdx'

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
            <CenteredEditable githubUrl={getContentGithubUrl({ filename: faqFilename })}>
              <MdxContent filepath={faqFilename} />
            </CenteredEditable>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
