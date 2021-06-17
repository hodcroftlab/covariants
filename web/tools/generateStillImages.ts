import fs from 'fs-extra'
import path from 'path'
import gifFrames from 'gif-frames'
import { concurrent } from 'fasy'

import { findModuleRoot } from '../lib/findModuleRoot'

const { moduleRoot: web } = findModuleRoot()

const GIF_DIR = path.join(web, 'public', 'proteins', 'gif')
const OUT_DIR = path.join(web, 'public', 'proteins', 'jpg')

export const generateStillImage = (inputDir: string, outputDir: string) => async (filename: string) => {
  const url = path.join(inputDir, filename)
  const out = path.join(outputDir, filename.replace(/\.gif$/, '.jpg'))
  const frameData = await gifFrames({ url, frames: 0 })
  frameData[0].getImage().pipe(fs.createWriteStream(out))
}

export async function generateStillImages() {
  await fs.mkdirp(OUT_DIR)
  const filenames = await fs.readdir(GIF_DIR)
  await concurrent.forEach(generateStillImage(GIF_DIR, OUT_DIR), filenames)
}

export async function main() {
  return generateStillImages()
}

main().catch(console.error)
