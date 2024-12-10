import { MDXProvider } from '@mdx-js/react'
import React, { PropsWithChildren, useCallback, useState } from 'react'

import {
  Button,
  ButtonProps,
  Col,
  Container,
  Modal as ReactstrapModal,
  ModalBody as ReactstrapModalBody,
  ModalFooter as ReactstrapModalFooter,
  ModalHeader as ReactstrapModalHeader,
  Row,
} from 'reactstrap'
import { styled } from 'styled-components'

import Changelog from '../../../../CHANGELOG.md'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { LinkExternal } from 'src/components/Link/LinkExternal'

export const ButtonOk = styled(Button)<ButtonProps>`
  width: 100px;
`

export const ModalHeader = styled(ReactstrapModalHeader)`
  .modal-title {
    width: 100%;
  }

  @media (max-width: 992px) {
    padding: 0.25rem;
    margin: 0.5rem;
    margin-bottom: 0;
  }
`

export const Modal = styled(ReactstrapModal)`
  height: 100%;

  @media (max-width: 1200px) {
    min-width: 80vw;
  }

  @media (min-width: 1199.98px) {
    min-width: 957px;
  }

  @media (min-width: 991.98px) {
    margin: 0.1vh auto;
  }

  // fullscreen on mobile
  @media (max-width: 992px) {
    max-width: unset;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 0;

    .modal-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
    }
  }
`

export const ModalBody = styled(ReactstrapModalBody)`
  @media (min-width: 991.98px) {
    max-height: 66vh;
    margin: auto;
  }

  overflow-y: auto;

  // prettier-ignore
  background:
    linear-gradient(#ffffff 33%, rgba(255,255,255, 0)),
    linear-gradient(rgba(255,255,255, 0), #ffffff 66%) 0 100%,
    radial-gradient(farthest-side at 50% 0, rgba(119,119,119, 0.5), rgba(0,0,0,0)),
    radial-gradient(farthest-side at 50% 100%, rgba(119,119,119, 0.5), rgba(0,0,0,0)) 0 100%;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-attachment: local, local, scroll, scroll;
  background-size:
    100% 24px,
    100% 24px,
    100% 8px,
    100% 8px;

  h1:first-child,
  h2:first-child {
    border-top: none;
    padding-top: 0;
    margin-top: 0;
  }

  code {
    padding: 2px;
    background-color: #eaeaea;
    border-radius: 2px;
  }

  pre {
    padding: 2px;
    background-color: #eaeaea;
    border-radius: 2px;
  }
`

export const ModalFooter = styled(ReactstrapModalFooter)`
  margin: 0;
  padding: 0;
`

export const H1 = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;

  @media (max-width: 992px) {
    font-size: 2rem;
  }
`

export const H2 = styled.h2`
  border-top: #ccc solid 1px;
  padding-top: 1rem;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2rem;

  @media (max-width: 992px) {
    font-size: 1.75rem;
    margin-top: 1.25rem;
  }
`

export const H3 = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  margin-top: 1.75rem;

  @media (max-width: 992px) {
    font-size: 1.5rem;
    margin-top: 1.2rem;
  }
`

export const H4 = styled.h4`
  font-size: 1.33rem;
  font-weight: bold;
  margin-top: 2rem;

  @media (max-width: 992px) {
    font-size: 1.2rem;
    margin-top: 1.2rem;
  }
`

export const H5 = styled.h5`
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1.1rem;

  @media (max-width: 992px) {
    font-size: 1rem;
    margin-top: 1.1rem;
  }
`

export const H6 = styled.h6`
  font-size: 1rem;
  font-weight: bold;
`

export const Blockquote = styled.blockquote`
  padding: 6px 8px;
  border-radius: 3px;
  background-color: #f4ebbd;
`

export const MarkdownWrapper = styled.article`
  text-align: justify;
`

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: LinkExternal,
  blockquote: Blockquote,
  wrapper: MarkdownWrapper,
}

export function ChangelogButton({ children, ...props }: PropsWithChildren<ButtonProps>) {
  const { t } = useTranslationSafe()

  const [showChangelog, setShowChangelog] = useState(false)

  const toggleOpen = useCallback(() => {
    setShowChangelog(!showChangelog)
  }, [showChangelog])

  const open = useCallback(() => {
    setShowChangelog(true)
  }, [])

  const close = useCallback(() => {
    setShowChangelog(false)
  }, [])

  const text = t('Recent updates')
  const closeText = t('Close this window')

  return (
    <>
      <Button type="button" color="link" onClick={open} title={text} {...props}>
        {children}
      </Button>

      <Modal centered isOpen={showChangelog} toggle={toggleOpen} fade={false} size="lg">
        <ModalHeader toggle={close} tag="div">
          <H1 className="text-center">{text}</H1>
        </ModalHeader>

        <ModalBody>
          <MDXProvider components={components}>
            <Changelog />
          </MDXProvider>
        </ModalBody>

        <ModalFooter>
          <Container fluid>
            <Row noGutters className="my-2">
              <Col className="d-flex w-100">
                <ButtonOk className="ms-auto" type="button" color="success" onClick={close} title={closeText}>
                  {'OK'}
                </ButtonOk>
              </Col>
            </Row>
          </Container>
        </ModalFooter>
      </Modal>
    </>
  )
}
