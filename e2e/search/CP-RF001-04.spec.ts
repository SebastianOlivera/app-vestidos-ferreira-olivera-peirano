import { test, expect } from '@playwright/test';

test('CP-RF001-04: Búsqueda con solo filtro de talla (M)', async ({ page }) => {

  await page.goto('/search');
  await page.fill('input[name="size"]', 'M');
  await page.click('button:has-text("Search")');

  const cards = page.locator('.grid > div');
  expect(await cards.count()).toBeGreaterThan(0);

  for (let i = 0; i < await cards.count(); i++) {
    const sizes = (await page.locator('p:has-text("Sizes")').innerText()).replace('Sizes:', '').split(',').map(s => s.trim().toUpperCase());
  }

});
