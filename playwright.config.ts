import { defineConfig } from '@playwright/test';

export default defineConfig({
   testDir: './tests', // folder containing your tests
   timeout: 30_000,
   expect: {
      timeout: 5_000
   },
   use: {
      headless: false, // or false if you want to see the browser
      baseURL: 'http://localhost:3000', // your dev server URL
      ignoreHTTPSErrors: true
   }
});
