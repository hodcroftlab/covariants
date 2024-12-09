import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'

/* eslint-disable no-loops/no-loops,no-param-reassign */
export function findModuleRoot(maxDepth = 10) {
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
