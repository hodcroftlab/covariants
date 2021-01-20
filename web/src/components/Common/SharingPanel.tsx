import React from 'react'

import urljoin from 'url-join'
import { useRouter } from 'next/router'

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
  PROJECT_NAME,
  TWITTER_HASHTAGS,
  TWITTER_RELATED,
  TWITTER_USERNAME_RAW,
} from 'src/constants'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'

const SOCIAL_ICON_SIZE = 30

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

export function SharingPanel() {
  const { asPath } = useRouter()
  const url = urljoin(DOMAIN, asPath)

  return (
    <Row noGutters>
      <Col>
        <Row noGutters>
          <Col className="d-flex text-center">
            <SharingPanelH1>{'Share'}</SharingPanelH1>
          </Col>
        </Row>

        <Row noGutters>
          <Col className="d-flex">
            <SharingPanelWrapper>
              <SharingButton title={'Send in an Email'}>
                <EmailShareButton url={url} subject={PROJECT_NAME} body={`\n${url}\n`}>
                  <EmailIcon size={SOCIAL_ICON_SIZE} />
                </EmailShareButton>
              </SharingButton>

              <SharingButton title={'Share on Twitter'}>
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

              <SharingButton title={'Share on Facebook'}>
                <FacebookShareButton url={url} quote={PROJECT_NAME} hashtag={FACEBOOK_HASHTAG}>
                  <FacebookIcon size={SOCIAL_ICON_SIZE} />
                </FacebookShareButton>
              </SharingButton>

              <SharingButton title={'Share on WhatsApp'}>
                <WhatsappShareButton url={url} title={PROJECT_NAME}>
                  <WhatsappIcon size={SOCIAL_ICON_SIZE} />
                </WhatsappShareButton>
              </SharingButton>

              <SharingButton title={'Share on LinkedIn'}>
                <LinkedinShareButton url={url} title={PROJECT_NAME}>
                  <LinkedinIcon size={SOCIAL_ICON_SIZE} />
                </LinkedinShareButton>
              </SharingButton>

              <SharingButton title={'Share on VK'}>
                <VKShareButton url={url} title={PROJECT_NAME}>
                  <VKIcon size={SOCIAL_ICON_SIZE} />
                </VKShareButton>
              </SharingButton>

              <SharingButton title={'Share on Weibo'}>
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
