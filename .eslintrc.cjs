const {configureEslint} = require('@jneander/dev-lint')

module.exports = configureEslint({
  node: true
})

module.exports.overrides.push({
  env: {
    node: true
  },

  files: ['./config/**/*.js', './scripts/**/*.js', '.eslintrc.cjs', '.prettierrc.cjs']
})
