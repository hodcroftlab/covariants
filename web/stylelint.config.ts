import type { Config } from 'stylelint'

export default {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  rules: {
    'no-invalid-position-at-import-rule': [
      true,
      {
        ignoreAtRules: ['use'],
      },
    ],
    'import-notation': 'string',
    'selector-max-compound-selectors': 4,
    'max-nesting-depth': 3,
  },
} satisfies Config
