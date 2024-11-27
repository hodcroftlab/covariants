import React from 'react'

import styled from 'styled-components'

import NextstrainIconBase from 'src/assets/images/nextstrain_logo.svg'

// Borrowed with modifications from Nextstrain.org
// https://github.com/nextstrain/nextstrain.org/blob/master/static-site/src/components/splash/title.jsx

const TITLE_COLORS = [
  '#4377CD',
  '#5097BA',
  '#63AC9A',
  '#7CB879',
  '#9ABE5C',
  '#B9BC4A',
  '#D4B13F',
  '#E49938',
  '#E67030',
  '#DE3C26',
]

const Wrapper = styled.div`
  display: flex;
  height: 30px;
`

const NextstrainIcon = styled(NextstrainIconBase)`
  width: 28px;
  height: 28px;
  margin-right: 5px;
`

const LetterSpan = styled.span<{ pos: number }>`
  font-size: 20px;
  color: ${(props) => TITLE_COLORS[props.pos]};
`

export function NextstrainLogo() {
  return (
    <Wrapper>
      <NextstrainIcon />
      <span>
        {'Nextstrain'.split('').map((letter, i) => (
          // eslint-disable-next-line react/no-array-index-key
          (<LetterSpan key={`${i}_${letter}`} pos={i}>
            {letter}
          </LetterSpan>)
        ))}
      </span>
    </Wrapper>
  );
}
