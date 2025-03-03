import { MDXComponents } from 'mdx/types'
import { styled } from 'styled-components'

import { LinkSmart } from 'src/components/Link/LinkSmart'
import { MdxContent } from 'src/i18n/getMdxContent'
import { AaMut } from 'src/components/Common/Badges/AminoacidMutationBadge'
import { NucMut } from 'src/components/Common/Badges/NucleotideMutationBadge'
import { Mut, Var } from 'src/components/Common/Badges/VariantBadge'
import { Lin } from 'src/components/Common/Badges/LineageBadge'
import { VarOrLin } from 'src/components/Common/Badges/VariantOrLineageBadge'

import { Who } from 'src/components/Common/Badges/WhoBadge'
import { VarOrLinText } from 'src/components/Common/Badges/VariantOrLineageText'

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
  VarOrLin,
  VarOrLinText,
  Who,
  MdxContent,
}

export function getMdxComponents(components: MDXComponents): MDXComponents {
  return { ...components, ...mdxComponents }
}
