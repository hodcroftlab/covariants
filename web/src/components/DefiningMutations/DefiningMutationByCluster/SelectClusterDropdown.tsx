import React, { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import urljoin from 'url-join'
import Select, { OnChangeValue, StylesConfig } from 'react-select'
import { useRecoilValue } from 'recoil'
import { DefiningMutationCluster } from 'src/io/getDefiningMutationsClusters'
import { DropdownOption } from 'src/components/Common/DropdownOption'
import { definingMutationClustersAtom } from 'src/state/DefiningMutations'

export function SelectClusterDropdown({ cluster }: { cluster: DefiningMutationCluster }) {
  const { push } = useRouter()
  const [value, setValue] = useState(cluster.lineage)
  const clusters = useRecoilValue(definingMutationClustersAtom)

  const options = useMemo(() => clusters.map(({ lineage }) => ({ label: lineage, value: lineage })), [clusters])
  const option = useMemo(() => ({ label: value, value }), [value])
  const onChange = useCallback(
    (newValue: OnChangeValue<DropdownOption<string>, false>) => {
      if (newValue) {
        void push(urljoin('/defining-mutations', newValue.value))
        setValue(newValue.value)
      }
    },
    [push],
  )

  return (
    <div>
      <span className="mr-2">{'Search lineages '}</span>
      <span>
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
  )
}

const DROPDOWN_STYLES: StylesConfig<{ label: string; value: string }> = {
  container: (base) => ({ ...base, width: '200px' }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
}
