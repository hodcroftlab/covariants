export declare class Iso31661a2 {
  getCountry(code: string): string | undefined

  getCode(country: string): string | undefined

  getCountries(): string[]

  getCodes(): string[]

  getData(): Record<string, string>
}

const iso31661a2: Iso31661a2

export default iso31661a2
