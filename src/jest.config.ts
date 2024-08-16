module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.test.ts"],
  testRunner: "jest-circus/runner",
  testTimeout: 10000, // Augmentez le délai d'attente pour les tests individuels
  maxWorkers: 2, // Limitez le nombre de travailleurs simultanés
};
