import React, { ChangeEvent, useCallback, useMemo } from 'react'
import { Form as FormBase, FormGroup as FormGroupBase, Input, Label } from 'reactstrap'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'

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

  const options = useMemo(
    () =>
      referenceSequences.map((id) => (
        <option key={id} value={id}>
          {id}
        </option>
      )),
    [referenceSequences],
  )

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedReference(event.target.value)
    },
    [setSelectedReference],
  )

  return (
    <FormBase>
      <FormGroupBase>
        <Label>
          <span className="my-1"> {t('Mutations relative to')}</span>
          <Input className="my-1" type="select" value={selectedSequence} onChange={onChange}>
            {options}
          </Input>
        </Label>
      </FormGroupBase>
    </FormBase>
  )
}
