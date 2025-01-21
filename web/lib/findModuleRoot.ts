import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package'

interface FindModuleRootResult {
  moduleRoot: string
  pkg: JSONSchemaForNPMPackageJsonFiles
}

/* eslint-disable no-loops/no-loops,no-param-reassign */
export function findModuleRoot(maxDepth = 10): FindModuleRootResult {
  let moduleRoot = fileURLToPath(new URL('.', import.meta.url))
  while (--maxDepth) {
    moduleRoot = path.resolve(moduleRoot, '..')
    const file = path.join(moduleRoot, 'package.json')
    if (fs.existsSync(file)) {
      const pkg = fs.readJsonSync(file)
      return { moduleRoot, pkg }
    }
  }
  throw new Error('Module root not found')
}
