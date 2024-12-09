import path from 'path'
import dotenv from 'dotenv'
import { findModuleRoot } from '../../lib/findModuleRoot.js'

const { moduleRoot } = findModuleRoot()

export default function loadEnvVars() {
  return dotenv.config({ path: path.join(moduleRoot, '.env') })
}
