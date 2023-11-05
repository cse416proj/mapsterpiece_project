const { Http } = require("@mui/icons-material");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '9go39f',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true,
    baseUrl:'http://localhost:3000'
  },
});
