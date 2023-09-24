/* eslint-disable */
export default {
  displayName: 'library-web',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {},
  coverageDirectory: '../../coverage/apps/library-web',
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest"
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
  ],
};
