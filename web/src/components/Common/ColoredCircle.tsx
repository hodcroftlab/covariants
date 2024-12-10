import { styled } from 'styled-components'

export const ColoredCircle = styled.div<{ $color: string; $size: number }>`
  display: inline-block;
  margin: auto;
  margin-right: ${(props) => props.$size / 2}px;
  background-color: ${(props) => props.$color};
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: ${(props) => props.$size / 2}px;
`
