import React, { useCallback, useMemo, useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownProps } from 'reactstrap'
import { useRecoilState } from 'recoil'

import { localeAtom } from 'src/state/locale.state'
import { getLocaleWithKey, Locale, localesArray } from 'src/i18n/i18n'

export type LanguageSwitcherProps = DropdownProps

export function LanguageSwitcher({ ...restProps }: LanguageSwitcherProps) {
  const [currentLocale, setCurrentLocale] = useRecoilState(localeAtom)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = useCallback(() => setDropdownOpen((prevState) => !prevState), [])
  const setLocaleLocal = useCallback((locale: Locale) => () => setCurrentLocale(locale.key), [setCurrentLocale])

  return (
    <Dropdown className="language-switcher" isOpen={dropdownOpen} toggle={toggle} {...restProps}>
      <DropdownToggle nav caret>
        <LanguageSwitcherItem locale={currentLocale} />
      </DropdownToggle>
      <DropdownMenu className="language-switcher-menu" positionFixed>
        {localesArray.map((locale) => {
          const isCurrent = locale.key === currentLocale
          return (
            <DropdownItem active={isCurrent} key={locale.key} onClick={setLocaleLocal(locale)}>
              <LanguageSwitcherItem locale={locale.key} />
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}

export function LanguageSwitcherItem({ locale }: { locale: string }) {
  const { Flag, name, native, key } = getLocaleWithKey(locale)

  const label = useMemo(() => {
    if (name === native) {
      return `${name}`
    }

    return `${name} (${native})`
  }, [name, native])

  return (
    <>
      <Flag className="language-switcher-flag" />
      <span className="ps-2 text-monospace">{`[${key}]`}</span>
      <span className="ps-2">{label}</span>
    </>
  )
}
