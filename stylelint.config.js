// Configuration for StyleLint
// See: https://stylelint.io/user-guide/configuration/

module.exports = {
  extends: ['@wemake-services/stylelint-config-scss', 'stylelint-config-css-modules', 'stylelint-a11y/recommended'],
  plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-a11y', 'stylelint-no-indistinguishable-colors'],

  rules: {
    // ignore special `var-` css variables for `:export`
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['/^var-/'],
      },
    ],

    // custom plugins to work with
    'plugin/no-unsupported-browser-features': [
      true,
      {
        ignore: [
          'css-fixed',
          'css-animation',
          'flexbox',
          'css-boxshadow',
          'border-radius',
          'transforms2d',
          'viewport-units',
          'calc',
          'outline',
          'word-break',
        ],
      },
    ],

    // a11y
    'a11y/content-property-no-static-value': true,

    'scale-unlimited/declaration-strict-value': ['/color/', 'fill', 'stroke'],

    'selector-type-no-unknown': [true, { ignoreTypes: ['forminput', 'message'] }],

    'plugin/no-low-performance-animation-properties': [true, { ignoreProperties: ['box-shadow'] }],

    'plugin/stylelint-no-indistinguishable-colors': false,
  },
}
