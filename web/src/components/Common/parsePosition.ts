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
