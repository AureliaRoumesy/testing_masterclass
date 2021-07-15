module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageThreshold: {
      global: {
        statements: 50,
        branches: 90,
        functions: 0,
        lines: 0,
      },
    },
    testMatch: [
      "**/unit/*.spec.ts",
      "**/feature/*.spec.ts"
    ],
    testPathIgnorePatterns: ['/node_modules/'],
    verbose: true,
}