import { test, expect } from '@playwright/test';

test('CP-RF005-01: Submit a valid rental request', async ({ page }) => {
  await page.goto('/items/1');

  await page.getByLabel('Full name').fill('Ana López');
  await page.getByLabel('Email').fill('ana@email.com');
  await page.getByLabel('Phone').fill('+598866674');
  await page.getByLabel('Start date').fill('2026-10-15');
  await page.getByLabel('End date').fill('2026-10-18');
  await page.click('button:has-text("Request rental")');

  expect(page.url()).toContain('success=1');
});
