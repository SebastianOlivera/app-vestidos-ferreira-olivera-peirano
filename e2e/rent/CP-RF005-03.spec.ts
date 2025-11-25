import { test, expect } from '@playwright/test';

test('CP-RF005-03: Prevent rental with invalid date range', async ({ page }) => {
  await page.goto('/items/1');

  await page.fill('input[name="name"]', 'Ana López');
  await page.fill('input[name="email"]', 'ana@test.com');
  await page.fill('input[name="phone"]', '12345');
  await page.fill('input[name="start"]', '2026-10-12');
  await page.fill('input[name="end"]', '2026-10-10');

  const [response] = await Promise.all([
    page.waitForResponse('/api/rentals'),
    page.click('button:has-text("Request rental")'),
  ]);

  expect(response.status()).toBe(400);
  const data = await response.json();
  expect(data.error).toBe('End date must be after start date');
});
