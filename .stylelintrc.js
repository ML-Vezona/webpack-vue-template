{
    "extends": [
      "stylelint-config-standard",
      "stylelint-config-sass-guidelines"
    ],
    "plugins": [
      "stylelint-scss",
      "stylelint-order"
    ],
    "rules": {
      "max-nesting-depth": 3,
      "number-leading-zero": "never",
      "number-no-trailing-zeros": true,
      "block-no-empty": true,
      "block-opening-brace-space-before": "always",
      "color-named": "never",
      "dollar-variable-colon-space-before": "never",
      "dollar-variable-colon-space-after": "always-single-line",
      "declaration-bang-space-before": "always",
      "declaration-bang-space-after": "never",
      "declaration-colon-space-after": "always",
      "declaration-colon-space-before": "never",
      "declaration-block-semicolon-space-before": "never",
      "declaration-block-semicolon-newline-after": "always-multi-line",
      "at-import-no-partial-leading-underscore": true,
      "property-no-vendor-prefix": true,
      "selector-no-redundant-nesting-selector": true,
      "function-comma-space-after": "always",
      "function-parentheses-space-inside": "never"
    }
  }