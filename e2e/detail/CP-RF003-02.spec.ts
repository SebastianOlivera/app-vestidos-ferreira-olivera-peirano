import { test, expect } from '@playwright/test';

test('CP-RF003-02: Navigate to removed item detail shows error', async ({ page }) => {
  const response = await page.goto('/items/9999');

  expect(response?.status()).toBe(404);
  await expect(page.getByText('Item not available')).toBeVisible();
});
