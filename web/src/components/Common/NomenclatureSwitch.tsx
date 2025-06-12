import { useRecoilState } from 'recoil'
import React from 'react'
import { styled } from 'styled-components'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { ToggleTwoLabels } from 'src/components/Common/ToggleTwoLabels'

export function NomenclatureSwitch({ className }: { className?: string }) {
  const [enablePangolin, setEnablePangolin] = useRecoilState(enablePangolinAtom)

  return (
    <NomenclatureToggle
      className={className}
      title="Switch nomenclature"
      checked={enablePangolin}
      onCheckedChanged={setEnablePangolin}
      labelLeft="Pango"
      labelRight="Nextstrain"
    />
  )
}

const NomenclatureToggle = styled(ToggleTwoLabels)`
  transform: scale(0.9);
`
