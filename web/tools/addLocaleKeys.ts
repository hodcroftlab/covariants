import path from 'path'
import fs from 'fs-extra'
import { sortBy, uniqBy } from 'lodash'
import { I18N_RESOURCES_DIR, I18N_RESOURCES_DEFAULT_LOCALE_FILE, readJson } from './fixLocales'

const ADDITIONAL_KEYS_FILE = path.join(I18N_RESOURCES_DIR, '../additional_keys.json')

function main() {
  const { json } = readJson(I18N_RESOURCES_DEFAULT_LOCALE_FILE)
  const originalEntries = Object.entries(json)

  const additionalKeys = fs.readJsonSync(ADDITIONAL_KEYS_FILE) as string[]
  const additionalEntries = additionalKeys.map((key) => [key, key])

  let newEntries = [...originalEntries, ...additionalEntries]
  newEntries = sortBy(newEntries, (entry) => entry[0])
  newEntries = uniqBy(newEntries, (entry) => entry[0])
  const newJson = Object.fromEntries(newEntries) as Record<string, string>

  fs.writeJsonSync(I18N_RESOURCES_DEFAULT_LOCALE_FILE, newJson, { spaces: 2 })
}

main()
