/* eslint-disable no-param-reassign,no-plusplus,no-loops/no-loops,prefer-destructuring,no-else-return,unicorn/prefer-code-point */

/**
 * Color Hash
 * by Simone Piccian (zanza00)
 * taken with modifications from
 * https://github.com/zanza00/color-hash/blob/6d43fa1b103fa090e1f0d788f5bfc4e99bf02263/src/color-hash.ts
 */

/**
 * BKDR Hash (modified version)
 *
 * @param {String} str string to hash
 * @returns {Number}
 */
export function BKDRHash(str: string): number {
  const seed = 131
  const seed2 = 137
  let hash = 0
  // make hash more sensitive for short string like 'a', 'b', 'c'
  str += 'x'
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER / seed2
  for (let i = 0; i < str.length; i++) {
    if (hash > MAX_SAFE_INTEGER) {
      hash = Math.floor(hash / seed2)
    }
    hash = hash * seed + str.charCodeAt(i)
  }
  return hash
}

/**
 * Convert RGB Array to HEX
 *
 * @param {Array} RGBArray - [R, G, B]
 * @returns {String} 6 digits hex starting with #
 */
function RGB2HEX(RGBArray: [number, number, number]): string {
  let hex = '#'
  RGBArray.forEach((value) => {
    if (value < 16) {
      hex += 0
    }
    hex += value.toString(16)
  })
  return hex
}

type func = (p: number, q: number) => (color: number) => number
const paramToColor: func = (p, q) => (color) => {
  if (color < 0) {
    color++
  }
  if (color > 1) {
    color--
  }
  if (color < 1 / 6) {
    color = p + (q - p) * 6 * color
  } else if (color < 0.5) {
    color = q
  } else if (color < 2 / 3) {
    color = p + (q - p) * 6 * (2 / 3 - color)
  } else {
    color = p
  }
  return Math.round(color * 255)
}

/**
 * Convert HSL to RGB
 *
 * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV} for further information.
 * @param {Number} H Hue ∈ [0, 360)
 * @param {Number} S Saturation ∈ [0, 1]
 * @param {Number} L Lightness ∈ [0, 1]
 * @returns {Array} R, G, B ∈ [0, 255]
 */
function HSL2RGB(H: number, S: number, L: number): [number, number, number] {
  const H360 = H / 360

  const q = L < 0.5 ? L * (1 + S) : L + S - L * S
  const p = 2 * L - q

  const partial = paramToColor(p, q)

  return [partial(H360 + 1 / 3), partial(H360), partial(H360 - 1 / 3)]
}

export { HSL2RGB as testFroHSL2RGB }

export type Options = {
  lightness?: number | number[]
  saturation?: number | number[]
  hue?: number | { min: number; max: number } | { min: number; max: number }[]
  hash?: typeof BKDRHash
}

/**
 * Color Hash Class
 *
 * @class
 */
class ColorHash {
  private L: number[]
  private S: number[]
  private hueRanges: { min: number; max: number }[]
  private hash: (str: string) => number

  constructor(options: Options = {}) {
    const LS = [options.lightness ?? [0.35, 0.5, 0.65], options.saturation ?? [0.35, 0.5, 0.65]].map((param) => {
      return Array.isArray(param) ? param.concat() : [param]
    })

    this.L = LS[0]
    this.S = LS[1]

    if (typeof options.hue === 'number') {
      options.hue = { min: options.hue, max: options.hue }
    }
    if (typeof options.hue === 'object' && !Array.isArray(options.hue)) {
      options.hue = [options.hue]
    }
    if (typeof options.hue === 'undefined') {
      options.hue = []
    }
    this.hueRanges = options.hue.map((range) => {
      return {
        min: typeof range.min === 'undefined' ? 0 : range.min,
        max: typeof range.max === 'undefined' ? 360 : range.max,
      }
    })

    this.hash = options.hash ?? BKDRHash
  }

  private getHue(hash: number): number {
    if (this.hueRanges.length > 0) {
      const range = this.hueRanges[hash % this.hueRanges.length]
      const hueResolution = 727 // note that 727 is a prime
      return (((hash / this.hueRanges.length) % hueResolution) * (range.max - range.min)) / hueResolution + range.min
    } else {
      return hash % 359 // note that 359 is a prime
    }
  }

  /**
   * Returns the hash in [h, s, l].
   * Note that H ∈ [0, 360); S ∈ [0, 1]; L ∈ [0, 1];
   *
   * @param {String} str string to hash
   * @returns {Array} [h, s, l]
   */
  hsl(str: string): [number, number, number] {
    const hash = this.hash(str)

    const H = this.getHue(hash)

    const sHash = Math.floor(hash / 360)

    const S = this.S[sHash % this.S.length]

    const lHash = Math.floor(sHash / this.S.length)

    const L = this.L[lHash % this.L.length]

    return [H, S, L]
  }

  /**
   * Returns the hash in [r, g, b].
   * Note that R, G, B ∈ [0, 255]
   *
   * @param {String} str string to hash
   * @returns {Array} [r, g, b]
   */
  rgb(str: string): [number, number, number] {
    const hsl = this.hsl(str)
    return HSL2RGB(...hsl)
  }

  /**
   * Returns the hash in hex
   *
   * @param {String} str string to hash
   * @returns {String} hex with #
   */
  hex(str: string): string {
    const rgb = this.rgb(str)
    return RGB2HEX(rgb)
  }
}

export interface ColorHashOptions extends Options {
  reverse?: boolean
  prefix?: string
  suffix?: string
}

export function colorHash(content: string, options?: ColorHashOptions) {
  let contentModified = content

  if (options?.reverse) {
    contentModified = contentModified.split('').reverse().join('')
  }

  if (options?.prefix) {
    contentModified = `${options.prefix}${contentModified}`
  }

  if (options?.suffix) {
    contentModified = `${contentModified}${options.suffix}`
  }

  return new ColorHash(options).hex(contentModified)
}
