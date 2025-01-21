import React, { useCallback, useMemo, useState } from 'react'

import urljoin from 'url-join'
import { useRouter } from 'next/router'
import { styled } from 'styled-components'
import { Button, Col, Row } from 'reactstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaClipboard as FaClipboardBase, FaClipboardCheck as FaClipboardCheckBase } from 'react-icons/fa'

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  VKIcon,
  VKShareButton,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'

import {
  DOMAIN,
  FACEBOOK_HASHTAG,
  PROJECT_DESCRIPTION,
  PROJECT_NAME,
  TWITTER_HASHTAGS,
  TWITTER_RELATED,
  TWITTER_USERNAME_RAW,
} from 'src/constants'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

const SOCIAL_ICON_SIZE = 30

const FaClipboard = styled(FaClipboardBase)`
  width: 18px;
  height: 18px;
  color: ${(props) => props.theme.gray600};
`

const FaClipboardCheck = styled(FaClipboardCheckBase)`
  width: 18px;
  height: 18px;
  color: ${(props) => props.theme.success};
`

const CopyToClipBoardButton = styled(Button)`
  padding: 0;
  margin: 0;
`

const SharingPanelH1 = styled.h1`
  font-size: 1.33rem;
  margin: 15px auto;
`

const SharingPanelWrapper = styled.aside`
  margin: 0 auto 15px;
`

const SharingButton = styled.span`
  margin: 3px;

  & > button,
  & > button > svg {
    width: ${SOCIAL_ICON_SIZE}px;
    height: ${SOCIAL_ICON_SIZE}px;
    border-radius: ${SOCIAL_ICON_SIZE / 2}px;
  }
`

function CopyToClipBoardComponent({ url }: { url: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleOnCopy = useCallback(() => setIsCopied(true), [])

  return (
    <CopyToClipboard text={url} onCopy={handleOnCopy}>
      <CopyToClipBoardButton>
        <span>{isCopied ? <FaClipboardCheck /> : <FaClipboard />}</span>
      </CopyToClipBoardButton>
    </CopyToClipboard>
  )
}

function getEmailBody(url: string) {
  return `${PROJECT_NAME}: ${PROJECT_DESCRIPTION}\n${url}\n`
}

export function SharingPanel() {
  const { t } = useTranslationSafe()
  const { asPath } = useRouter()
  const url = urljoin(DOMAIN, asPath)
  const emailBody = useMemo(() => getEmailBody(url), [url])

  return (
    <Row className={'gx-0'}>
      <Col>
        <Row className={'gx-0'}>
          <Col className="d-flex text-center">
            <SharingPanelH1>{t('Share')}</SharingPanelH1>
          </Col>
        </Row>

        <Row className={'gx-0'}>
          <Col className="d-flex">
            <SharingPanelWrapper>
              <SharingButton title={t('Copy link to clipboard')}>
                <CopyToClipBoardComponent url={url} />
              </SharingButton>

              <SharingButton title={t('Send in an Email')}>
                <EmailShareButton url="" subject={PROJECT_NAME} body={emailBody}>
                  <EmailIcon size={SOCIAL_ICON_SIZE} />
                </EmailShareButton>
              </SharingButton>

              <SharingButton title={t('Share on Twitter')}>
                <TwitterShareButton
                  url={url}
                  title={PROJECT_NAME}
                  via={TWITTER_USERNAME_RAW}
                  hashtags={TWITTER_HASHTAGS}
                  related={TWITTER_RELATED}
                >
                  <TwitterIcon size={SOCIAL_ICON_SIZE} />
                </TwitterShareButton>
              </SharingButton>

              <SharingButton title={t('Share on Facebook')}>
                <FacebookShareButton url={url} hashtag={FACEBOOK_HASHTAG}>
                  <FacebookIcon size={SOCIAL_ICON_SIZE} />
                </FacebookShareButton>
              </SharingButton>

              <SharingButton title={t('Share on WhatsApp')}>
                <WhatsappShareButton url={url} title={PROJECT_NAME}>
                  <WhatsappIcon size={SOCIAL_ICON_SIZE} />
                </WhatsappShareButton>
              </SharingButton>

              <SharingButton title={t('Share on LinkedIn')}>
                <LinkedinShareButton url={url} title={PROJECT_NAME}>
                  <LinkedinIcon size={SOCIAL_ICON_SIZE} />
                </LinkedinShareButton>
              </SharingButton>

              <SharingButton title={t('Share on VK')}>
                <VKShareButton url={url} title={PROJECT_NAME}>
                  <VKIcon size={SOCIAL_ICON_SIZE} />
                </VKShareButton>
              </SharingButton>

              <SharingButton title={t('Share on Weibo')}>
                <WeiboShareButton url={url} title={PROJECT_NAME}>
                  <WeiboIcon size={SOCIAL_ICON_SIZE} />
                </WeiboShareButton>
              </SharingButton>
            </SharingPanelWrapper>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
