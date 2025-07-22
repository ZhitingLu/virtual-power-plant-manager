module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }], // relative to jest.config.js
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
// This is a Jest configuration file for the API module of the project.
// It uses ts-jest for TypeScript support and sets the test environment to Node.js.
