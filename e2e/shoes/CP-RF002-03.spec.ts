import { test, expect } from '@playwright/test';

test('CP-RF002-03: List shoes without filters', async ({ page }) => {
  await page.goto('/search');
  await page.selectOption('select[name="category"]', 'shoes');
  await page.click('button:has-text("Search")');

  const cards = page.locator('.grid > div');
  const count = await cards.count();

  expect(count).toBeGreaterThanOrEqual(2);

  await expect(cards.first().locator('p:has-text("Sizes")')).toBeVisible();
});
