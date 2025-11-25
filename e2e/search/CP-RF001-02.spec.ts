import { test, expect } from '@playwright/test';

test('CP-RF001-02: Búsqueda sin resultados', async ({ page }) => {

  await page.goto('/search');
  await page.fill('input[name="size"]', 'XXXS');
  await page.click('button:has-text("Search")');

  const noResults = page.locator('text=No items match your filters');

  await expect(noResults).toBeVisible();

  const cards = page.locator('.grid > div');

  const count = await cards.count();

  expect(count).toBe(0);
});
