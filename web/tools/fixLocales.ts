import path from 'path'
import * as url from 'node:url'
import fs from 'fs-extra'
import difference from 'lodash/difference'
import isObject from 'lodash/isObject'
import padStart from 'lodash/padStart'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { notUndefined } from 'src/helpers/notUndefined'
import { safeZip } from 'src/helpers/safeZip'

export const DEFAULT_LOCALE_KEY = 'en'
export const I18N_RESOURCES_DIR = 'src/i18n/resources/'
export const I18N_RESOURCES_DEFAULT_LOCALE_FILE = path.join(I18N_RESOURCES_DIR, DEFAULT_LOCALE_KEY, 'common.json')

const FIXUPS = {
  '{{PROJECT_NAME}} (c) {{copyrightYearRange}} {{COMPANY_NAME}}':
    '{{PROJECT_NAME}} (c) {{copyrightYearRange}} {{COMPANY_NAME}}',
  'ID': 'ID',
  'OK': 'OK',
}

export function getSubstitutions(str: string) {
  return str.match(/{{.*?}}/g) ?? []
}

export const quote = (str: string) => `'${str}'`

export function readJson(filepath: string) {
  const content = fs.readFileSync(filepath, 'utf8')
  const jsonDangerous = JSON.parse(content) as unknown

  if (!isObject(jsonDangerous)) {
    console.warn(`'${filepath}':\nNot a valid JSON\n`)
  }

  const json = jsonDangerous as Record<string, string>

  return { content, json }
}

export function parseLocale(json: Record<string, string>) {
  return Object.entries(json).map(([reference, localized], index) => {
    const refSubsts = getSubstitutions(reference)
    const locSubsts = getSubstitutions(localized)
    const missing = difference(refSubsts, locSubsts)
    const extra = difference(locSubsts, refSubsts)
    return { index, missing, extra, reference, localized }
  })
}

export function getReferenceKeys() {
  const { json } = readJson(I18N_RESOURCES_DEFAULT_LOCALE_FILE)
  const results = parseLocale(json)
  return results.map(({ reference }) => reference)
}

export function fixSpaces(s: string) {
  let fixed = s.replaceAll(/([^ !#$%&()*,.;=_`{}~-]){{/gim, '$1 {{')
  fixed = fixed.replaceAll(/}}([^ !#$%&()*,./:;=_`{}~-])/gim, '}} $1')
  fixed = fixed.replaceAll(/ +/gim, ' ')
  fixed = fixed.replaceAll(/" (.*) "/gim, '"$1"')
  fixed = fixed.replaceAll(/" (.*)"/gim, '"$1"')
  fixed = fixed.replaceAll(/"(.*) "/gim, '"$1"')
  fixed = fixed.replaceAll(/ :/gim, ':')
  return fixed
}

function main() {
  const dirs = fs.readdirSync(I18N_RESOURCES_DIR)

  const filepaths = dirs.flatMap((dir) => {
    const langDir = path.join(I18N_RESOURCES_DIR, dir)
    return fs
      .readdirSync(langDir)
      .filter((filename) => filename.endsWith('.json'))
      .map((filename) => path.join(langDir, filename))
  })

  const referenceKeys = getReferenceKeys()

  filepaths.forEach((filepath) => {
    const { json } = readJson(filepath)
    const results = parseLocale(json)

    const keysBefore = results.length
    const resultsFiltered = results.filter(({ reference }) => referenceKeys.includes(reference))
    const keysAfter = resultsFiltered.length
    const keysRemoved = keysBefore - keysAfter

    const resultsFixed = resultsFiltered.map(({ index, missing, extra, reference, localized }) => {
      let missingFixed = missing
      let extraFixed = extra
      let localizedFixed: string | undefined
      if (!isEmpty(missing) && !isEmpty(extra) && missing.length === extra.length) {
        localizedFixed = localized
        const dictionary = safeZip(missing, extra)
        const missingToExtra = Object.fromEntries(dictionary)
        const extraToMissing = Object.fromEntries(dictionary.map(([k, v]) => [v, k]))

        dictionary.forEach(([missing, extra]) => {
          localizedFixed = localizedFixed?.replace(RegExp(extra, 'g'), missing)
        })

        missingFixed = missing.filter((m) => !extra.includes(get(missingToExtra, m)))
        extraFixed = extra.filter((e) => !missing.includes(get(extraToMissing, e)))
      }

      return { index, missing, missingFixed, missingExtra: extraFixed, extra, reference, localized, localizedFixed }
    })

    const contentFixed = resultsFixed.reduce(
      (result, { reference, localized, localizedFixed }) => {
        Object.entries(FIXUPS).forEach(([ref, qry]) => {
          if (reference === ref) {
            // eslint-disable-next-line no-param-reassign
            localizedFixed = qry
          }
        })

        return {
          result: {
            ...result.result,
            [reference]: fixSpaces(localizedFixed ?? localized),
          },
          total: localizedFixed ? result.total + 1 : result.total,
        }
      },
      { result: {}, total: 0 },
    )

    fs.writeJsonSync(filepath, contentFixed.result, { spaces: 2 })

    if (contentFixed.total > 0) {
      console.info(`\nIn file: '${filepath}':\nInfo: corrected ${contentFixed.total} translation issues automatically`)
    }

    if (keysRemoved > 0) {
      console.info(`\nIn file: '${filepath}':\nInfo: removed ${keysRemoved} unused keys`)
    }

    if (resultsFixed.every(({ missingFixed, missingExtra }) => isEmpty(missingFixed) && isEmpty(missingExtra))) {
      return
    }

    const message = resultsFixed
      .filter(({ missingFixed, missingExtra }) => !(isEmpty(missingFixed) && isEmpty(missingExtra)))
      .sort((x, y) => x.index - y.index)
      .map(({ index, missing, extra, reference, localized }) => {
        if (isEmpty(missing) && isEmpty(extra)) {
          return undefined
        }

        const entry = padStart(index.toString(10), 3)
        const missingStr = missing.map(quote).join(', ')
        const extraStr = extra.map(quote).join(', ')
        return `Entry ${entry}:\n    reference: '${reference}'\n    localized: '${localized}'\n    missing  : ${missingStr}\n    extra    : ${extraStr}`
      })
      .filter(notUndefined)
      .join('\n\n')

    if (message !== '') {
      console.warn(
        `\nIn file '${filepath}':\nWarning: translation issues found which cannot be automatically corrected:\n${message}\n`,
      )
    }
  })
}

const modulePath = url.fileURLToPath(import.meta.url)
if (process.argv[1] === modulePath) {
  main()
}
