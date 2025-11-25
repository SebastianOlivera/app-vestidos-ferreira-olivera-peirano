import { test, expect } from '@playwright/test';

test('CP-RF001-03: Search without filters (list everything)', async ({ page }) => {
  await page.goto('/search');

  await page.click('button:has-text("Search")');

  const cards = page.locator('.grid > div');
  const count = await cards.count();

  expect(count).toBeGreaterThan(3);
});