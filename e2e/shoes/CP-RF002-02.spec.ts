import { test, expect } from '@playwright/test';

test('CP-RF002-02: Handle invalid shoe filters', async ({ page }) => {
  await page.goto('/search');

  await page.selectOption('select[name="category"]', 'shoes');
  await page.fill('input[name="size"]', '100');
  await page.click('button:has-text("Search")');

  await expect(page.locator('text=No items match your filters.')).toBeVisible();
  await expect(page.locator('.grid > div')).toHaveCount(0);
});
