/* eslint-disable no-param-reassign,no-loops/no-loops */

function hslToRgb(h: number, s: number, l: number) {
  let r
  let g
  let b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const hue2rgb = function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

export interface RainbowOptions {
  rgb?: boolean
  lum?: number
  sat?: number
}

export function rainbow(num: number, config?: RainbowOptions) {
  const _config = config ?? {
    lum: 50,
    sat: 50,
  }
  const _lum = (Number.isNaN(_config.lum) ? 50 : _config.lum) ?? 50
  const _sat = (Number.isNaN(_config.sat) ? 50 : _config.sat) ?? 50
  const _num = Number.isNaN(num) ? 3 : num
  const retarr = []
  for (let i = 0; i < _num; ++i) {
    if (config?.rgb) {
      retarr.push(`rgb(${hslToRgb(i / _num, _sat / 100, _lum / 100).toString()})`)
    } else {
      retarr.push(`HSL(${(360 * i) / _num},${_sat}%,${_lum}%)`)
    }
  }
  return retarr
}
