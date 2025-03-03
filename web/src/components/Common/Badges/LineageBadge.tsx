import React, { useMemo } from 'react'
import { styled } from 'styled-components'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { colorHash } from 'src/helpers/colorHash'
import { ColoredText, MutationBadgeBox, MutationWrapper, PrefixText } from 'src/components/Common/Badges/MutationBadge'
import { LinkSmart } from 'src/components/Link/LinkSmart'

export function LineageBadge({ name, href, prefix, report }: LineageBadgeProps) {
  const { t } = useTranslationSafe()

  const url = useMemo(
    () => href ?? (report ? `https://cov-lineages.org/global_report_${name}.html` : ''),
    [href, report, name],
  )
  const tooltip = useMemo(() => {
    const text = t('Pango Lineage')
    return `${text} '${name}'`
  }, [name, t])

  return (
    <LinkUnstyled href={url}>
      <MutationBadgeBox title={tooltip}>
        <MutationWrapper>
          {prefix && <PrefixText>{prefix}</PrefixText>}
          <ColoredText
            $color={colorHash(name, {
              reverse: false,
              prefix: '',
              suffix: '',
              lightness: 0.75,
              hue: undefined,
              saturation: undefined,
            })}
          >
            {name}
          </ColoredText>
        </MutationWrapper>
      </MutationBadgeBox>
    </LinkUnstyled>
  )
}

export interface LineageBadgeProps {
  name: string
  href?: string
  prefix?: string
  report?: boolean
}

export const LinkUnstyled = styled(LinkSmart)`
  color: unset;
  text-decoration: none;

  &:active,
  &:focus,
  &:hover {
    color: unset;
    text-decoration: none;
  }
`

/** Shorter convenience alias for LineageLinkBadge */
export function Lin({ name, href, prefix = '', report }: LineageBadgeProps) {
  return <LineageBadge name={name} href={href} prefix={prefix} report={report} />
}
