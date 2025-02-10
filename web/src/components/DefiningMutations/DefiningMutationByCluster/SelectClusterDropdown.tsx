import React, { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import urljoin from 'url-join'
import { useRecoilValue } from 'recoil'
import { Label } from 'reactstrap'
import { styled } from 'styled-components'
import { DefiningMutationCluster } from 'src/io/getDefiningMutationsClusters'
import { DropdownOption, stringToOption } from 'src/components/Common/DropdownOption'
import { definingMutationClustersAtom } from 'src/state/DefiningMutations'
import { useTranslationSafe } from 'src/helpers/useTranslationSafe'
import { Dropdown } from 'src/components/Common/Dropdown'

const Wrapper = styled.div`
  max-width: 200px;
  min-width: 150px;
`

export function SelectClusterDropdown({ cluster }: { cluster: DefiningMutationCluster }) {
  const { t } = useTranslationSafe()
  const { push } = useRouter()
  const [value, setValue] = useState(cluster.lineage)
  const clusters = useRecoilValue(definingMutationClustersAtom)

  const options = useMemo(() => clusters.map(({ lineage }) => ({ label: lineage, value: lineage })), [clusters])
  const onChange = useCallback(
    (newValue: DropdownOption<string>) => {
      void push(urljoin('/defining-mutations', newValue.value))
      setValue(newValue.value)
    },
    [push],
  )

  return (
    <Wrapper>
      <Label for="search-lineages">{t('Search lineages')}</Label>
      <Dropdown
        identifier="search-lineages"
        options={options}
        value={stringToOption(value)}
        onOptionChange={onChange}
        isSearchable={true}
      />
    </Wrapper>
  )
}
