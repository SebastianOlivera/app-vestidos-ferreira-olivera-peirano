import { test, expect } from '@playwright/test';

test('CP-RF006-02: Show error when deleting a non-existent item', async ({ page }) => {
  await page.goto('/admin/login');
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
  await page.click('button:has-text("Sign in")');

  await page.waitForURL('/admin');

  await page.fill('#delete-id', '999');
  await page.click('button:has-text("Delete")');

  await expect(page.locator('text=Item not found')).toBeVisible();
});
