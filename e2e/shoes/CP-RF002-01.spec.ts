import { test, expect } from '@playwright/test';

test('CP-RF002-01: Filter shoes by color and size', async ({ page }) => {
  await page.goto('/search');

  await page.selectOption('select[name="category"]', 'shoes');
  await page.fill('input[name="color"]', 'black');
  await page.fill('input[name="size"]', '38');
  await page.click('button:has-text("Search")');

  const cards = page.locator('.grid > div');
  const count = await cards.count();

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    await expect(card.locator('p:has-text("Sizes")')).toContainText('38');
    await card.locator('a:has-text("View details")').click();
    await expect(page.locator('p:has-text("Color:")')).toContainText('black', { ignoreCase: true });
    await expect(page.locator('p:has-text("Sizes")')).toContainText('38');
    await page.goBack();
    expect(count).toBeGreaterThan(0);
  }
});
