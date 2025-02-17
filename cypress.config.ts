// import { defineConfig } from "cypress";
// import cucumber from "cypress-cucumber-preprocessor";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       on("file:preprocessor", cucumber());
//     },
//     baseUrl: "http://localhost:3000",
//     specPattern: "cypress/e2e/**/*.feature",
//   },
// });

import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  video: true,
  e2e: {
    baseUrl: "http://localhost:3000",
    // baseUrl: "https://networks-app-nextjs.vercel.app",
    specPattern: "**/*.feature",
    setupNodeEvents,
  },
});
