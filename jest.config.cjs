/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  transform: { "^.+\\.(t|j)sx?$": ["ts-jest", { tsconfig: "tsconfig.json" }] }
};
