export function parsePosition(raw: string | undefined | null) {
  if (!raw || raw.length === 0) {
    return undefined
  }

  const num = Number.parseInt(raw, 10)

  if (!Number.isFinite(num)) {
    return undefined
  }

  return num
}

export function parsePositionOrThrow(raw: string | undefined | null) {
  const pos = parsePosition(raw)
  if (!pos) {
    throw new Error(`Unable to parse mutation posiiton: '${JSON.stringify(raw)}'`)
  }
  return pos
}
