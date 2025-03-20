# Internationalization

Our goal is to make CoVariants accessible to as many people as possible. We provide (auto-generated) translation for interactive elements of the website. 
Providing translations for all content is unfortunately currently beyond our resources. If you would like to help and provide a translation for a language
you are familiar with, feel free to make a pull request.

## Generating translations
We use [i18next](https://www.i18next.com/) to provide internationalization and [json-autotranslation](https://www.npmjs.com/package/json-autotranslate) to generate the translations.
To update the i18next keys and translations, run all steps of the translation pipeline (`yarn i18n:update`):

```bash
yarn i18n:extract
```
Extracts translation keys from the source files (anything that gets used by i18next) and add them to the default location keys file (`en/common.json`). 
As the extraction is static, only string literals can be extracted, not variables. i18next will print warnings for keys that cannot be extracted.

```bash
yarn i18n:addkeys
```
Add keys that are missed by `extract` (e.g. because they come from a variable) from `additional_keys.json`. This file is hand-curated and mostly concerns countries and regions.

```bash
yarn i18n:fix
```
Check keys and apply some fixes.

```bash
yarn i18n:translate
```
Translate all keys from English to the languages found in `i18n/resources`. Needs valid aws credentials.

## Adding a new language
Add a new empty folder with the name of the language code you want ot add to `i18n/resources`. Then run `yarn i18n:translate`. You need aws credentials.
Then add the new language to the list of languages in `i18/i18n.ts`.
