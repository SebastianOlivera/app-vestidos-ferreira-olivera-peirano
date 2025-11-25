import { test, expect } from '@playwright/test';

test('CP-RF001-04: Search using only size filter (M)', async ({ page }) => {
  await page.goto('/search');
  await page.fill('input[name="size"]', 'M');
  await page.click('button:has-text("Search")');

  const cards = page.locator('.grid > div');
  const count = await cards.count();

  for (let i = 0; i < count; i++) {
    const sizes = (
      await cards.nth(i).locator('p:has-text("Sizes")').innerText()
    )
      .replace('Sizes:', '')
      .split(',')
      .map(s => s.trim().toUpperCase());

    expect(sizes).toContain('M');
    expect(count).toBeGreaterThan(0);
  }
});
