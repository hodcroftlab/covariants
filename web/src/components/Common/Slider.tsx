import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  & {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent; /* Otherwise white in Chrome */
    height: 12px;
    border-radius: 6px;
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  &:focus-visible {
    outline: none;
  }

  /* Special styling for WebKit/Blink */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #fff;
    height: 16px;
    width: 16px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -4px;
  }

  &:focus-visible::-webkit-slider-thumb {
    outline: 5px auto -webkit-focus-ring-color;
  }

  /* All the same stuff for Firefox */
  &::-moz-range-thumb {
    background: #fff;
    height: 16px;
    width: 16px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -4px;
  }

  /* https://remysharp.com/til/css/focus-ring-default-styles */
  &:focus-visible::-moz-range-thumb {
    outline: 5px auto Highlight;
  }

  &::-webkit-slider-runnable-track {
    height: 8px;
    width: 100%;
    cursor: pointer;
    background: #ccc;
    box-sizing: border-box;
    border-radius: 4px;
  }

  &::-moz-range-track {
    height: 8px;
    width: 100%;
    cursor: pointer;
    background: #ccc;
    box-sizing: border-box;
    border-radius: 4px;
  }
`

function Slider(props) {
  return <Input type="range" {...props} />
}

export default Slider
