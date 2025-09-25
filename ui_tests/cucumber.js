module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['features/step_definitions/**/*.ts'],
    format: ['html:playwright-report/cucumber-report.html'],
    paths: ['features/**/*.feature'],
  },
};
