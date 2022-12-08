/* eslint-disable no-template-curly-in-string,sonarjs/no-duplicate-string */

/**
 *
 * This dangerously and unreliably patches some node_modules. Mostly cosmetic stuff.
 * Do no use this to fix bugs or introduce features. Consider contributing to the upstream project instead.
 *
 */
import { concurrent } from 'fasy'
import fs from 'fs-extra'
import glob from 'glob'
import { promisify } from 'util'

export async function replace(filename: string, searchValue: string | RegExp, replaceValue = '') {
  const content = await fs.readFile(filename, 'utf8')
  const newContent = content.replace(searchValue, replaceValue)
  await fs.writeFile(filename, newContent, { encoding: 'utf8' })
}

/** Strips timerStart() and timerEnd() calls from Auspice */
export async function removeAuspiceTimers() {
  await fs.rm('node_modules/auspice/src/util/perf.js', { force: true })

  const files = await promisify(glob)('node_modules/auspice/src/**/*.js')

  await concurrent.forEach(async (file) => {
    await replace(file, /.*(timerStart|timerEnd)\(".+"\);.*\n/g, '')
    await replace(file, /.*import { timerStart, timerEnd }.*\n/g, '')
  }, files)
}

export async function main() {
  await Promise.all([
    // Removes warning "<title> should not be used in _document.js".
    // Reason: We want title and other SEO tags to be pre-rendered, so that crawlers could find them.
    replace(
      'node_modules/next/dist/pages/_document.js',
      `console.warn("Warning: <title> should not be used in _document.js's <Head>. https://nextjs.org/docs/messages/no-document-title");`,
    ),

    // Removes warning about babel codegen skipping optimizations. We only use babel in form of babel-node, to transpile
    // dev scripts on the fly, so this is not at all worth any attention.
    // Reason: too noisy
    concurrent.forEach(
      async (file) => {
        await replace(
          file,
          'console.error("[BABEL] Note: The code generator has deoptimised the styling of " + `${opts.filename} as it exceeds the max of ${"500KB"}.`);',
        )
        await replace(
          file,
          'console.error(\n' +
            '        "[BABEL] Note: The code generator has deoptimised the styling of " +\n' +
            '          `${opts.filename} as it exceeds the max of ${"500KB"}.`,\n' +
            '      );',
        )
      },
      ['node_modules/@babel/generator/lib/index.js', 'node_modules/next/dist/compiled/babel/bundle.js'],
    ),

    replace(
      'node_modules/next/dist/build/index.js',
      "`${Log.prefixes.info} ${ignoreTypeScriptErrors ? 'Skipping validation of types' : 'Checking validity of types'}`",
      '""',
    ),

    // Removes reminder about upgrading caniuse database. Nice, but not that important. Will be handled along with
    // routine package updates.
    // Reason: too noisy
    concurrent.forEach(
      async (file) =>
        replace(
          file,
          `      console.warn(
        'Browserslist: caniuse-lite is outdated. Please run:\\n' +
          '  npx browserslist@latest --update-db\\n' +
          '  Why you should do it regularly: ' +
          'https://github.com/browserslist/browserslist#browsers-data-updating'
      )`,
        ),
      ['node_modules/browserslist/node.js'],
    ),

    concurrent.forEach(
      async (file) =>
        replace(
          file,
          `console.warn("Browserslist: caniuse-lite is outdated. Please run:\\n"+"  npx browserslist@latest --update-db\\n"+"  Why you should do it regularly: "+"https://github.com/browserslist/browserslist#browsers-data-updating")`,
        ),
      [
        'node_modules/next/dist/compiled/browserslist/index.js',
        'node_modules/next/dist/compiled/cssnano-simple/index.js',
      ],
    ),

    // Fast refresh messages in browser console
    replace(
      'node_modules/next/dist/client/dev/error-overlay/hot-dev-client.js',
      "console.log('[Fast Refresh] rebuilding');",
    ),
    replace(
      'node_modules/next/dist/client/dev/error-overlay/hot-dev-client.js',
      'console.log(`[Fast Refresh] done in ${latency}ms`);',
    ),

    replace(
      'node_modules/next/dist/server/base-server.js',
      'Log.warn(`You have added a custom /_error page without a custom /404 page. This prevents the 404 page from being auto statically optimized.\\nSee here for info: https://nextjs.org/docs/messages/custom-error-no-custom-404`);',
    ),

    removeAuspiceTimers(),
  ])

  // More useless messages from Next.js
  await replace('node_modules/next/dist/server/config.js', 'console.warn();')
  await replace(
    'node_modules/next/dist/server/config.js',
    "Log.warn('SWC minify release candidate enabled. https://nextjs.org/docs/messages/swc-minify-enabled');",
  )
  await replace(
    'node_modules/next/dist/server/config.js',
    "Log.warn(_chalk.default.bold('You have enabled experimental feature(s).'));",
  )
  await replace(
    'node_modules/next/dist/server/config.js',
    'Log.warn(`Experimental features are not covered by semver, and may cause unexpected or broken application behavior. ` + `Use them at your own risk.`);',
  )
  await replace(
    'node_modules/next/dist/build/webpack-config.js',
    "Log.info(`automatically enabled Fast Refresh for ${injections} custom loader${injections > 1 ? 's' : ''}`);",
  )
  await replace('node_modules/@next/env/dist/index.js', 'n.info(`Loaded env from ${t.join(r||"",_.path)}`)')
  await replace('node_modules/next/dist/build/output/store.js', "Log.wait('compiling...');")
  await replace('node_modules/next/dist/build/output/store.js', 'Log.wait(`compiling ${state.trigger}...`);')
  await replace(
    'node_modules/next/dist/build/output/store.js',
    'Log.info(`bundled${partialMessage} successfully${timeMessage}${modulesMessage}, waiting for typecheck results...`);',
  )
  await replace(
    'node_modules/next/dist/build/output/store.js',
    'Log.event(`compiled${partialMessage} successfully${timeMessage}${modulesMessage}`);',
  )

  // From fork-ts-checker-webpack-plugin
  await replace(
    'node_modules/fork-ts-checker-webpack-plugin/lib/hooks/tapDoneToAsyncGetIssues.js',
    "configuration.logger.issues.log(chalk_1.default.cyan('Issues checking in progress...'));",
  )
}

main().catch(console.error)
