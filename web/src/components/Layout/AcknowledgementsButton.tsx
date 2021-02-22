import React, { useState } from 'react'

import styled from 'styled-components'
import {
  Button,
  ButtonProps,
  Col,
  Container,
  Modal as ReactstrapModal,
  ModalBody as ReactstrapModalBody,
  ModalFooter,
  ModalHeader as ReactstrapModalHeader,
  Row,
} from 'reactstrap'

import AcknowledgementsContent from './AcknowledgementsContent.md'

export const ButtonOk = styled(Button)<ButtonProps>`
  width: 100px;
`

export const ModalHeader = styled(ReactstrapModalHeader)`
  .modal-title {
    width: 100%;
  }
`

export const Modal = styled(ReactstrapModal)`
  @media (max-width: 1200px) {
    min-width: 80vw;
  }
  @media (min-width: 1201px) {
    min-width: 957px;
  }
`

export const ModalBody = styled(ReactstrapModalBody)`
  max-height: 66vh;
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
  background-size: 100% 24px, 100% 24px, 100% 8px, 100% 8px;

  h1:first-child,
  h2:first-child {
    border-top: none;
    padding-top: 0;
    margin-top: 0;
  }
`

export const AcknowledgementsButtonStyled = styled.button`
  border: none;
  box-shadow: none;
  outline: none;
  background: transparent;

  &:focus {
    outline: none;
  }
`

export function AcknowledgementsButton({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  function toggleOpen() {
    setIsOpen(!isOpen)
  }

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <AcknowledgementsButtonStyled className={className} onClick={open} title={'Acknowledgements'}>
      {'Acknowledgements'}

      <Modal centered isOpen={isOpen} toggle={toggleOpen} fade={false} size="lg">
        <ModalHeader toggle={close} tag="div">
          <h3 className="text-center">{'Acknowledgements'}</h3>
        </ModalHeader>

        <ModalBody>
          <AcknowledgementsContent />
        </ModalBody>

        <ModalFooter>
          <Container fluid>
            <Row noGutters className="my-2">
              <Col className="d-flex w-100">
                <ButtonOk className="ml-auto" type="button" color="secondary" onClick={close} title={'Close'}>
                  {'Close'}
                </ButtonOk>
              </Col>
            </Row>
          </Container>
        </ModalFooter>
      </Modal>
    </AcknowledgementsButtonStyled>
  )
}
