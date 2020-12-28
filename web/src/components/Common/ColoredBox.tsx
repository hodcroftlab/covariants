import styled from 'styled-components'

export const ColoredBox = styled.div<{ $color: string; $size: number; $aspect: number }>`
  display: inline-block;
  margin: auto;
  margin-right: ${(props) => props.$size / 2}px;
  background-color: ${(props) => props.$color};
  width: ${(props) => props.$size * props.$aspect}px;
  height: ${(props) => props.$size}px;
  border-radius: 2px;
`
