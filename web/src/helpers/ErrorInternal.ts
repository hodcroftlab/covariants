import { URL_GITHUB_ISSUES } from 'src/constants'

export class ErrorInternal extends Error {
  public constructor(message: string) {
    super(
      `Internal Error: ${message}. This is an internal issue, likely due to a programming mistake. Please report it to developers at '${URL_GITHUB_ISSUES}' so that they could fix it.`,
    )
  }
}
