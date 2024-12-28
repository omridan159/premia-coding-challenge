import type { BrowserContext } from '@playwright/test';
import { test as baseTest, expect } from '@playwright/test';
import type { Dappwright } from '@tenkeylabs/dappwright';
import dappwright, { MetaMaskWallet } from '@tenkeylabs/dappwright';

export const test = baseTest.extend<{
   context: BrowserContext;
   wallet: Dappwright;
}>({
   context: async ({}, use) => {
      // Launch browser context with MetaMask extension
      const [, , context] = await dappwright.bootstrap('', {
         wallet: 'metamask',
         version: MetaMaskWallet.recommendedVersion,
         seed: 'test test test test test test test test test test test junk',
         headless: false
      });

      await use(context);
   },

   wallet: async ({ context }, use) => {
      const metamask = await dappwright.getWallet('metamask', context);

      await use(metamask);
   }
});

test.describe('Web3 Wallet Full Flow', () => {
   test.beforeEach(async ({ page }) => {
      // Navigate to the application before each test
      await page.goto('http://localhost:3000');
   });

   test('User connects, signs a message, and disconnects', async ({ wallet, page }) => {
      // Connect Wallet
      const connectButton = page.getByRole('button', { name: /Connect Wallet/i });
      await expect(connectButton).toBeVisible({ timeout: 10000 });
      await connectButton.click();

      // Wait for RainbowKit modal and select MetaMask
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible({ timeout: 10000 });

      const metamaskOption = modal.getByText(/MetaMask/i);
      await metamaskOption.click();

      // Approve wallet connection
      await wallet.approve();

      // Verify wallet connection
      const addressDisplay = page.getByText(/Address/i);
      await expect(addressDisplay).toBeVisible();

      // Sign a Message
      const signButton = page.getByRole('button', { name: /Sign Message/i });
      await expect(signButton).toBeVisible();
      await signButton.click();

      await wallet.sign();

      // Wait for the signature to be displayed
      const signatureDisplay = page.locator('text=Signature:');
      await expect(signatureDisplay).toBeVisible({ timeout: 5000 });

      const signatureText = await signatureDisplay.textContent();
      console.log('Signature:', signatureText);
   });
});
