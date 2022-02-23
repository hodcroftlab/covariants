import Papa from 'papaparse'
import { appendDash } from '../helpers/appendDash'

export function parseCsv(content: string) {
  const { data, errors, meta } = Papa.parse(content, {
    header: true,
    skipEmptyLines: 'greedy',
    trimHeaders: true,
    dynamicTyping: true,
    comments: '#',
  })

  if (errors.length > 0) {
    throw new Error(
      `CSV error: ${errors
        .map((error) => error.message)
        .map(appendDash)
        .join('\n')}`,
    )
  } else if (meta.aborted) {
    throw new Error('CSV error: Aborted')
  } else if (!data?.length) {
    throw new Error('CSV error: There was no data')
  }

  return data
}
