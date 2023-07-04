module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  collectCoverage: true, // You need to set this to true to collect coverage data
  collectCoverageFrom: [
    "server/**/*.ts",
    "!server/database/db.ts", // Assuming you don't want to collect coverage from your db connection file
    "!server/**/*.d.ts", // Exclude .d.ts files
    "!server/**/__tests__/**", // Exclude tests
    "!**/node_modules/**",
  ],
};
