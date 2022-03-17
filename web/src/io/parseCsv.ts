import Papa, { ParseConfig } from 'papaparse'
import { appendDash } from '../helpers/appendDash'

export function parseCsv<T>(content: string): T[] {
  const config: ParseConfig<T> = {
    header: true,
    skipEmptyLines: 'greedy',
    dynamicTyping: true,
    comments: '#',
  }

  const { data, errors, meta } = Papa.parse(content, config)

  if (errors.length > 0) {
    throw new Error(
      `CSV error: ${errors
        .map((error) => error.message)
        .map(appendDash)
        .join('\n')}`,
    )
  } else if (meta.aborted) {
    throw new Error('CSV error: Aborted')
  } else if (data.length === 0) {
    throw new Error('CSV error: There was no data')
  }

  return data
}
