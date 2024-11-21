// TODO: remove this ts-ignore, only here to get intermediate build off the ground
// @ts-ignore
import { MDXProviderComponents } from '@mdx-js/react'
import styled from 'styled-components'

import { AaMut, Lin, Mut, NucMut, Var, Who } from 'src/components/Common/MutationBadge'
import { LinkSmart } from 'src/components/Link/LinkSmart'
import { MdxContent } from 'src/i18n/getMdxContent'

export const Pre = styled.pre`
  padding: 0.5rem 1rem;

  background-color: ${(props) => props.theme.code.pre.background};

  code {
    background-color: ${(props) => props.theme.code.pre.background};
  }

  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
`

export const mdxComponents = {
  a: LinkSmart,
  pre: Pre,
  AaMut,
  NucMut,
  Var,
  Mut,
  Lin,
  Who,
  MdxContent,
}

export function getMdxComponents(components: MDXProviderComponents): MDXProviderComponents {
  return { ...components, ...mdxComponents }
}
