/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.*\\.test\\.(ts|tsx)$',
    '.*\\.d\\.ts$',
  ],
  coverageDirectory: '<rootDir>/coverage/',
  coverageThreshold: {
    global: {
      statements: 18.57,
      branches: 33,
      functions: 13.33,
      lines: 19.64,
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    '\\.css$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
};
