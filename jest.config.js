/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  //does not work with typeorm
  resetModules: false,
  // resetModules: true,
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
      tsConfig: 'tsconfig.json'
    }
  },
  // globalSetup: "./test/global/setup.ts",
  // globalTeardown: "./test/global/teardown.ts",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: ['**/tests/**/*.test.ts'],
  testEnvironment: 'node'
};