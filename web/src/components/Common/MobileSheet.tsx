import React, { useState } from 'react'
import styled from 'styled-components'
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md'

interface SheetProps {
  isOpen: boolean
}

const Sheet = styled.div<SheetProps>`
  background: #fff;
  position: fixed;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border: 1px solid #eee;
  border-bottom: 0;
  left: 0;
  right: 0;
  /* top: 100%; */
  bottom: 0;
  padding: 1.5rem;
  z-index: 1;
  box-shadow: ${(p) => p.theme.shadows.normal};

  transition: all 300ms ease-in-out;
  transform: translateY(${(p) => (p.isOpen ? '0' : '100%')});
`

interface ToggleButtonProps {
  active: boolean
}

const ToggleButton = styled.button<ToggleButtonProps>`
  position: absolute;
  right: 1rem;
  bottom: calc(100% + 1rem);
  box-shadow: ${(p) => p.theme.shadows.light};
  background-color: #fff;
  border: 1px solid ${(p) => (p.active ? p.theme.primary : 'rgba(123, 131, 138, 0.2)')};
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  outline: none;

  :focus {
    outline: none;
  }

  :focus-visible {
    outline: unset;
  }
`

const ButtonIcon = styled(MdArrowDropUp)<{ $rotated?: boolean }>`
  margin-left: 0.25rem;
  fill: ${(props) => props.theme.gray550};
  transition: transform linear 0.25s;
  transform: rotate(${(props) => (props.$rotated ? '-180deg' : '0deg')});
`

export function MobileSheet({ label, children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Sheet isOpen={isOpen}>
      <ToggleButton active={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {label}
        <ButtonIcon size={24} $rotated={isOpen} />
      </ToggleButton>
      {children}
    </Sheet>
  )
}
