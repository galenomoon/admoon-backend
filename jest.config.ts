import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest", // Interpret TypeScript files
  testEnvironment: "node", // Run tests in Node.js environment
  verbose: true, // Output more information
  collectCoverage: true, // Collect coverage information
  collectCoverageFrom: [
    "<rootDir>/src/useCases/*.ts", // Collect coverage from use cases
  ],
};

export default config;
