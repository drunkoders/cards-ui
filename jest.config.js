module.exports = {
  ...require("@snowpack/app-scripts-react/jest.config.js")(),
  moduleNameMapper: {
    "^@atoms/(.*)$": "<rootDir>/src/components/atoms/$1",
    "^@pages/(.*)$": "<rootDir>/src/components/pages/$1",
    "^@moldes/(.*)$": "<rootDir>/src/models/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1"
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!<rootDir>/node_modules/",
  ],
  coverageReporters: ["text", "lcov"]
};
