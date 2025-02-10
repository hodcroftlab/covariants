import React, { ChangeEvent, useCallback, useMemo, HTMLProps } from 'react'
import { styled } from 'styled-components'
import { Form, Input as InputBase } from 'reactstrap'
import { MdSearch as IconSearchBase, MdClear as IconClearBase } from 'react-icons/md'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { ButtonTransparent } from 'src/components/Common/ButtonTransparent'

const SearchForm = styled(Form)`
  display: inline;
  position: relative;
`

const IconSearchWrapper = styled.span`
  display: inline;
  position: absolute;
  padding: 5px 7px;
`

const IconSearch = styled(IconSearchBase)`
  * {
    color: ${(props) => props.theme.gray500};
  }
`

const ButtonClear = styled(ButtonTransparent)`
  display: inline;
  position: absolute;
  right: 0;
  padding: 0 7px;
`

const IconClear = styled(IconClearBase)`
  * {
    color: ${(props) => props.theme.gray500};
  }
`

const Input = styled(InputBase)`
  display: inline !important;
  padding-left: 35px;
  padding-right: 30px;
  height: 2.2em;
`

export interface TableSearchBoxProps extends Omit<HTMLProps<HTMLFormElement>, 'as'> {
  searchTitle?: string
  searchTerm: string
  onSearchTermChange(term: string): void
}

export function SearchBox({ searchTitle, searchTerm, onSearchTermChange }: TableSearchBoxProps) {
  const { t } = useTranslationSafe()

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSearchTermChange(event.target.value)
    },
    [onSearchTermChange],
  )

  const onClear = useCallback(() => {
    onSearchTermChange('')
  }, [onSearchTermChange])

  const buttonClear = useMemo(() => {
    if (searchTerm.length === 0) {
      return null
    }
    return (
      <ButtonClear onClick={onClear} title={t('Clear')}>
        <IconClear size={20} />
      </ButtonClear>
    )
  }, [onClear, searchTerm.length, t])

  return (
    <SearchForm>
      <IconSearchWrapper>
        <IconSearch size={25} />
      </IconSearchWrapper>
      <Input
        type="text"
        title={searchTitle}
        placeholder={searchTitle}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        data-gramm="false"
        value={searchTerm}
        onChange={onChange}
      />
      {buttonClear}
    </SearchForm>
  )
}
