import React, { useCallback, useId, useMemo } from 'react'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import {
  DropdownOption,
  stringsToOptionsWithLabels,
  stringToOptionWithLabel,
} from 'src/components/Common/DropdownOption'
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

  const options = useMemo(() => stringsToOptionsWithLabels(referenceSequences, toSentenceCase), [referenceSequences])

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
        className={'width-5xs'}
        options={options}
        value={stringToOptionWithLabel(selectedSequence, toSentenceCase)}
        onOptionChange={onChange}
        isSearchable={true}
      />
    </div>
  )
}

const toSentenceCase = (str: string) => {
  const s = str?.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.join(' ')
  if (s === undefined) {
    return str
  }
  return s.slice(0, 1).toUpperCase() + s.slice(1)
}
