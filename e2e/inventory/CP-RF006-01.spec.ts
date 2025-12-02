import { test, expect } from '@playwright/test';

test('CP-RF006-01: Admin can add a valid item', async ({ page }) => {
  await page.goto('/admin/login');
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
  await page.click('button:has-text("Sign in")');

  await page.waitForURL('/admin');

  await page.click('button:has-text("Add New Dress")');
  await page.fill('input[placeholder*="Evening Gown"]', 'Blue Summer Dress');
  await page.selectOption('select:has(option[value="dress"])', 'dress');
  
  await page.locator('label.flex.items-center.gap-1.cursor-pointer:has-text("M")').click();

  await page.selectOption('select:has(option[value="blue"])', 'blue');
  await page.selectOption('select:has(option[value="evening"])', 'evening');
  await page.fill('input[placeholder*="e.g., 59"]', '1000');
  await page.click('button:has-text("Add Dress")');

  await expect(page.locator('td:has-text("Blue Summer Dress")')).toBeVisible();
  await expect(page.locator('td:has-text("$1000")')).toBeVisible();
});
