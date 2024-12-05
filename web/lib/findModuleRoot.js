import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

/* eslint-disable no-loops/no-loops,no-param-reassign,no-plusplus */
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
