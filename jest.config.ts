import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});


const config: Config = {
  ...createJestConfig,
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFiles: ["text-encoding"],
};

export default createJestConfig(config);
