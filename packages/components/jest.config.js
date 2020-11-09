module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  "roots": [
    "<rootDir>/src"
  ],
  testMatch: [
    "<rootDir>/src/**/*.{spec,test}.{ts,tsx}",
  ],
  testPathIgnorePatterns: ["node_modules/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    "^@atoms/(.*)$": "<rootDir>/src/components/atoms/$1",
    "^@molecules/(.*)$": "<rootDir>/src/components/molecules/$1",
    "^@organisms/(.*)$": "<rootDir>/src/components/organisms/$1",
    "^@pages/(.*)$": "<rootDir>/src/components/pages/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@store/(.*)$": "<rootDir>/src/store/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "jest-transform-stub"
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!<rootDir>/node_modules/",
  ],
  coverageReporters: ["text", "lcov"]
};
