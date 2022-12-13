import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import GisaidLogoBase from 'src/assets/images/GISAID_logo.svg'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import classNames from 'classnames'

const GisaidText = styled.small`
  color: #fffd;
  font-size: 0.75rem;
`

const GisaidLogo = styled(GisaidLogoBase)``

export function PoweredByGisaid({ className }: { className?: string }) {
  const { t } = useTranslationSafe()

  const { textBefore, textAfter } = useMemo(() => {
    const [textBefore, textAfter] = t("Enabled by data from 'GISAID'").split("'GISAID'")
    return {
      textBefore: textBefore ? <span className="mr-1">{textBefore}</span> : null,
      textAfter: textAfter ? <span className="ml-1">{textAfter}</span> : null,
    }
  }, [t])

  return (
    <GisaidText className={classNames('mr-auto', className)}>
      {textBefore}
      <LinkExternal href="https://www.gisaid.org/" icon={null}>
        <GisaidLogo height={15} />
      </LinkExternal>
      {textAfter}
    </GisaidText>
  )
}
