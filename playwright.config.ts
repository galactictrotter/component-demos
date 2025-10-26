import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: path.join(__dirname, 'ai-tests'),
  snapshotDir: path.join(__dirname, 'screenshots'),
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: 'file://',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
