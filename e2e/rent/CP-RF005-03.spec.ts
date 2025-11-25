import { test, expect } from '@playwright/test';

test('CP-RF005-03: Prevent rental with invalid date range', async ({ page }) => {
  await page.goto('/items/1');

  await page.getByLabel('Full name').fill('Ana López');
  await page.getByLabel('Email').fill('ana@email.com');
  await page.getByLabel('Phone').fill('+598866674');
  await page.getByLabel('Start date').fill('2026-10-18');
  await page.getByLabel('End date').fill('2026-10-15');
  await page.waitForTimeout(500);
  const [response] = await Promise.all([
    page.waitForResponse('/api/rentals'),
    page.click('button:has-text("Request rental")'),
  ]);

  expect(response.status()).toBe(400);
  const data = await response.json();
  expect(data.error).toBe('End date must be after start date');
});
