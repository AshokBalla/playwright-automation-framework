import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './tests',
    timeout: 60000,
    expect: {
        timeout: 10000
    },
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 60000,
        trace: 'on-first-retry',
        launchOptions: {
            slowMo: 1000,
        },
    },
    reporter: 'html',
};

export default config; 