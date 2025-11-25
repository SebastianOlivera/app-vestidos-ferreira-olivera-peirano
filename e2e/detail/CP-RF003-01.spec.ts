import { test, expect } from '@playwright/test';

test('CP-RF003-01: View valid item detail', async ({ page }) => {
  await page.goto('/search');
  await page.click('button:has-text("Search")');

  const firstCard = page.locator('.grid > div').first();
  await firstCard.locator('a:has-text("View details")').click();

  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('img')).toBeVisible();
  await expect(page.locator('p:has-text("Sizes")')).toBeVisible();
  await expect(page.locator('p:has-text("Color")')).toBeVisible();
  await expect(page.locator('text=From $')).toBeVisible();
});
