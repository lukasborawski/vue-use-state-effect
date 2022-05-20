import { Config } from '@jest/types'

const config: Config.InitialOptions = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^#/(.*)$': '<rootDir>/__tests__/$1',
  },
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: false,
  testPathIgnorePatterns: [
    '__tests__/(mocks|utils|integration)/',
    '<rootDir>/(node_modules)/',
    'demo-(vue|nuxt)/',
  ],
}

export default config
