module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'src/step-definitions/**/*.ts'
    ],
    format: [
      'html:playwright-report/cucumber-report.html'
    ],
    paths: ['features/**/*.feature'],
  },
};
