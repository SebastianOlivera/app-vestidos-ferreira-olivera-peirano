import { test, expect } from '@playwright/test';

test('CP-RF006-03: Admin can edit an item price', async ({ page }) => {
  await page.goto('/admin/login');
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
  await page.click('button:has-text("Sign in")');

  await page.waitForURL('/admin');

  await page.fill('#edit-id', '1');
  await page.fill('#new-price', '1200');
  await page.click('button:has-text("Update price")');

  await expect(page.locator('td:has-text("$1200")')).toBeVisible();
});
