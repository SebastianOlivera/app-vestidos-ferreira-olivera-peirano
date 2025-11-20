import { test, expect } from '@playwright/test';

test('CP-RF001-01: Búsqueda de vestidos', async ({ page }) => {

  await page.goto('/search');

  await page.fill('input[name="size"]', 'M');
  await page.fill('input[name="color"]', 'Burgundy');
  await page.fill('input[name="style"]', 'Cocktail');

  await page.click('button:has-text("Search")');

  const cards = page.locator('.grid > div');
  
  const count = await cards.count();

  expect(count).toBeGreaterThan(0);

  await cards.first().locator('a:has-text("View Details")').click();

  const sizes = (await page.locator('p:has-text("Sizes")').innerText()).replace('Sizes:', '').split(',').map(s => s.trim().toUpperCase());
  const color = (await page.locator('p:has-text("Color")').innerText()).split('•')[0].replace('Color:', '').trim().toUpperCase();
  const style = (await page.locator('p:has-text("Color")').innerText()).split('•')[1].replace('Style:', '').trim().toUpperCase();

  expect(sizes).toContain('M');
  expect(color).toBe('BURGUNDY');
  expect(style).toBe('COCKTAIL');

});
