module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    "\\.[jt]sx?$": 'babel-jest'
  },
     testEnvironmentOptions: {
       customExportConditions: ["jest-environment-jsdom", "node", "node-addons"],
    },
};
