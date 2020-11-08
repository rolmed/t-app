const {
  override,
  // addLessLoader,
  useEslintRc,
  enableEslintTypescript,
} = require('customize-cra');

module.exports = override(
  // addLessLoader({
  //   javascriptEnabled: true,
  // }),
  useEslintRc('./.eslintrc.js'),
  enableEslintTypescript(),
);
