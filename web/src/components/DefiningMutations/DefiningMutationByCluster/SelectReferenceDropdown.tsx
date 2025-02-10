import React, { useCallback, useMemo } from 'react'
import { Label } from 'reactstrap'
import { styled } from 'styled-components'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { DropdownOption, stringsToOptions, stringToOption } from 'src/components/Common/DropdownOption'
import { Dropdown } from 'src/components/Common/Dropdown'

const Wrapper = styled.div`
  max-width: 200px;
`

export function SelectReferenceDropdown({
  referenceSequences,
  selectedSequence,
  setSelectedReference,
}: {
  referenceSequences: string[]
  selectedSequence: string
  setSelectedReference(currentTargetId: string): void
}) {
  const { t } = useTranslationSafe()

  const options = useMemo(() => stringsToOptions(referenceSequences), [referenceSequences])

  const onChange = useCallback(
    (newValue: DropdownOption<string>) => {
      setSelectedReference(newValue.value)
    },
    [setSelectedReference],
  )

  return (
    <Wrapper>
      <Label for="mutations-relative-to">{t('Mutations relative to')}</Label>
      <Dropdown
        identifier="mutations-relative-to"
        options={options}
        value={stringToOption(selectedSequence)}
        onOptionChange={onChange}
        isSearchable={true}
      />
    </Wrapper>
  )
}
