/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
if (!Function.prototype.toJSON) {
  function toJSON(this: Function) {
    return this.toString()
  }

  if (Object.defineProperty) {
    Object.defineProperty(Function.prototype, 'toJSON', {
      value: toJSON,
      configurable: true,
      writable: true,
    })
  } else {
    // @ts-ignore
    Function.prototype.toJSON = toJSON
  }
}
