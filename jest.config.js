/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  resetModules: false,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__fixtures__/',
    '/__tests__/',
    '/(__)?mock(s__)?/',
    '/__jest__/',
    '.?.min.js',
    'migration',
  ],
  globals: {
    "ts-jest": {
      tsconfig: './tsconfig.json'
    }
  },
  globalSetup: "<rootDir>/src/tests/global/setup.ts",
  globalTeardown: "<rootDir>/src/tests/global/teardown.ts",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: ['**/tests/**/*.test.ts'],
  testEnvironment: 'node'
};