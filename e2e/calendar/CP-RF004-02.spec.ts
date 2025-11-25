import { test, expect } from '@playwright/test';

test('CP-RF004-02: Calendar without reservations shows all available', async ({ page }) => {
  await page.goto('/items/6');

  const bookedCells = page.locator('.grid.grid-cols-7 div:has-text("Booked")');
  await expect(bookedCells).toHaveCount(0);

  const totalCells = await page.locator('.grid.grid-cols-7 div').count();
  expect(totalCells).toBeGreaterThan(0);
});
