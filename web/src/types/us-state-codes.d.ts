export declare class USStateCodes {
  sanitizeStateCode(stateCode: string): string | null

  sanitizeStateName(stateName: string): string | null

  getStateNameByStateCode(stateCode: string): string | null

  getStateCodeByStateName(stateName: string): string | null
}

const usStateCodes: USStateCodes

export default usStateCodes
