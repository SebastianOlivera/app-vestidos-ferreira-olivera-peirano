import { test, expect } from '@playwright/test';

test('CP-RF004-01: Calendar highlights booked dates', async ({ page }) => {
  await page.goto('/items/1');

  const bookedCells = page.locator('.grid.grid-cols-7 div:has-text("Booked")');
  await expect(bookedCells.first()).toBeVisible();
});
