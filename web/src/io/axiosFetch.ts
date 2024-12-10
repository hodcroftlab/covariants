import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios'
import { isNil } from 'lodash'
import serializeJavascript from 'serialize-javascript'
import { ErrorInternal } from 'src/helpers/ErrorInternal'
import { sanitizeError } from 'src/helpers/sanitizeError'

export class HttpRequestError extends Error {
  public readonly request?: AxiosRequestConfig
  public readonly response?: AxiosResponse

  constructor(error_: AxiosError) {
    super(error_.message)
    this.request = error_.config
    this.response = error_.response
  }
}

export async function axiosFetch<TData = unknown>(
  url: string | undefined,
  options?: AxiosRequestConfig,
): Promise<TData> {
  if (isNil(url)) {
    throw new ErrorInternal(`Attempted to fetch from an invalid URL: '${serializeJavascript(url)}'`)
  }

  let res
  try {
    res = await axios.get(url, options)
  } catch (error) {
    throw isAxiosError(error) ? new HttpRequestError(error) : sanitizeError(error)
  }

  if (!res?.data) {
    throw new Error(`Unable to fetch: request to URL "${serializeJavascript(url)}" resulted in no data`)
  }

  return res.data as TData
}

export async function axiosFetchMaybe(url?: string): Promise<string | undefined> {
  if (!url) {
    return undefined
  }
  return axiosFetch(url)
}

/**
 * This version skips any transforms (such as JSON parsing) and returns plain string
 */
export async function axiosFetchRaw(url: string | undefined, options?: AxiosRequestConfig): Promise<string> {
  return axiosFetch(url, { ...options, transformResponse: [] })
}

export async function axiosFetchRawMaybe(url?: string): Promise<string | undefined> {
  if (!url) {
    return undefined
  }
  return axiosFetchRaw(url)
}
