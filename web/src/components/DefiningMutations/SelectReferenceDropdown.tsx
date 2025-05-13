import React, { useCallback, useId, useMemo } from 'react'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { DropdownOption, stringsToOptions, stringToOption } from 'src/components/Common/DropdownOption'
import { Dropdown } from 'src/components/Common/Dropdown'

const style = { maxWidth: '300px' }

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
  const id = useId()

  const options = useMemo(() => stringsToOptions(referenceSequences), [referenceSequences])

  const onChange = useCallback(
    (newValue: DropdownOption<string>) => {
      setSelectedReference(newValue.value)
    },
    [setSelectedReference],
  )

  return (
    <div style={style} className="d-flex gap-2 align-items-center">
      <label className="text-nowrap" htmlFor={id}>
        {t('relative to')}
      </label>
      <Dropdown
        identifier={id}
        options={options}
        value={stringToOption(selectedSequence)}
        onOptionChange={onChange}
        isSearchable={true}
      />
    </div>
  )
}
