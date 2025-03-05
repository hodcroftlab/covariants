import { useRecoilState } from 'recoil'
import React from 'react'
import { styled } from 'styled-components'
import Router from 'next/router'
import { enablePangolinAtom } from 'src/state/Nomenclature'
import { ToggleTwoLabels } from 'src/components/Common/ToggleTwoLabels'
import { parseUrl } from 'src/helpers/parseUrl'
import { setUrlPath } from 'src/helpers/urlQuery'

export function NomenclatureSwitch({ className }: { className?: string }) {
  const [enablePangolin, setEnablePangolin] = useRecoilState(enablePangolinAtom)

  return (
    <NomenclatureToggle
      className={className}
      title="Switch nomenclature"
      checked={enablePangolin}
      onCheckedChanged={setEnablePangolin}
      labelLeft="Pangolin"
      labelRight="Nextstrain"
    />
  )
}

const NomenclatureToggle = styled(ToggleTwoLabels)`
  transform: scale(0.9);
`

export function updateUrlOnPangolinSet(enablePangolin: boolean, buildNames: string[], lineageMap: Map<string, string>) {
  const { pathname: oldPath } = parseUrl(Router.asPath)
  const [, path, variantName] = oldPath.split('/')

  // If nomenclature is changed, we will remove cluster url params
  let pangoLineage
  if (variantName in buildNames) {
    pangoLineage = lineageMap.get(variantName)
  }

  console.log(pangoLineage, oldPath, variantName)
  setUrlPath(pangoLineage && enablePangolin ? `/${path}/${pangoLineage}` : oldPath).catch((error) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    throw new Error(error)
  })
}
