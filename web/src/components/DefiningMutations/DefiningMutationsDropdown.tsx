import React, { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import urljoin from 'url-join'
import Select, { OnChangeValue, StylesConfig } from 'react-select'
import { DefMutClusterDatum, getDefMutClusters } from 'src/io/getDefiningMutationsClusters'
import { DropdownOption } from 'src/components/Common/DropdownOption'

const clusters = getDefMutClusters()

export function DefiningMutationsDropdown({ cluster }: { cluster: DefMutClusterDatum }) {
  const { push } = useRouter()
  const [value, setValue] = useState(cluster.lineage)

  const options = useMemo(() => clusters.map(({ lineage }) => ({ label: lineage, value: lineage })), [])
  const option = useMemo(() => ({ label: value, value }), [value])
  const onChange = useCallback(
    (newValue: OnChangeValue<DropdownOption<string>, false>) => {
      if (newValue) {
        void push(urljoin('/defining-mutations', newValue.value)) // eslint-disable-line no-void
        setValue(newValue.value)
      }
    },
    [push],
  )

  return (
    <div className="d-flex w-100">
      <div className="ml-auto mx-2">
        <span className="mr-2">{'Search lineages '}</span>
        <span className="d-inline-flex">
          <Select<DropdownOption<string>, false>
            options={options}
            value={option}
            onChange={onChange}
            isClearable={false}
            isMulti={false}
            isSearchable
            menuPortalTarget={document.body}
            styles={DROPDOWN_STYLES}
          />
        </span>
      </div>
    </div>
  )
}

const DROPDOWN_STYLES: StylesConfig<{ label: string; value: string }> = {
  container: (base) => ({ ...base, width: '200px' }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
}
