import { test, expect } from '@playwright/test';

test('CP-RF001-03: Search without filters (list everything)', async ({ page }) => {
  await page.goto('/search');

  await page.click('button:has-text("Search")');

  // Esperar a que la UI termine de renderizar resultados
  await page.waitForLoadState('networkidle');

  // Selector robusto: cualquier card con imagen
  const cards = page.locator('div:has(img)');

  const count = await cards.count();
  expect(count).toBeGreaterThan(3);
});
