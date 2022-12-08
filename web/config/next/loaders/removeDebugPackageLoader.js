function stripDebugRequire(source) {
  return source
    .replace(
      /__importDefault\s*\(\s*require\s*\(\s*["']\s*debug\s*["']\s*\)\s*\)/g,
      '{ default() { return function () {} } }\n',
    )
    .replace(
      /_interopRequireDefault\s*\(\s*require\s*\(\s*["']\s*debug\s*["']\s*\)\s*\)/g,
      '{ default() { return function () {} } }\n',
    )
    .replace(/.*?require\(\s*["']debug["']\s*\).*/g, '(function(){return function () {}})\n')
    .replace(/import\s+(.+)\s+from\s+["']debug["']/g, 'const $1 = (function(){ return function () {} })\n')
}

/**
 * Webpack loader which removes imports and requires of the `debug` package from JavaScript.
 * This is especially important in presence of WebWorkers: `debug` package uses `windows` global, which is not
 * present in WebWorker environment.
 */
export default function removeDebugPackageLoader(source) {
  this.callback(null, stripDebugRequire(source))
}
