module.exports = {
  ...require("@snowpack/app-scripts-react/jest.config.js")(),
  moduleNameMapper: {
    "^@atoms/(.*)$": "<rootDir>/src/components/atoms/$1",
    "^@molecules/(.*)$": "<rootDir>/src/components/molecules/$1",
    "^@pages/(.*)$": "<rootDir>/src/components/pages/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1"
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!<rootDir>/node_modules/",
  ],
  coverageReporters: ["text", "lcov"]
};
