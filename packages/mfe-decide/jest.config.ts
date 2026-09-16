export default {
  displayName: 'mfe-decide',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/packages/mfe-decide',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  // @angular-architects/native-federation declara "type": "commonjs" pero su entry point
  // (src/index.js) usa `export * from ...` (sintaxis ESM) — sin esta excepción, Jest lo deja
  // sin transformar y falla al parsearlo como CommonJS.
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|.*@angular-architects.native-federation|.*until-async)',
  ],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
