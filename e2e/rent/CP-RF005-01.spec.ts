import { test, expect } from '@playwright/test';

test('CP-RF005-01: Submit a valid rental request', async ({ page }) => {
  await page.goto('/items/1');

  await page.fill('input[name="name"]', 'María Pérez');
  await page.fill('input[name="email"]', 'maria@test.com');
  await page.fill('input[name="phone"]', '099999999');
  await page.fill('input[name="start"]', '2026-10-10');
  await page.fill('input[name="end"]', '2026-10-12');
  
  await page.click('button:has-text("Request rental")');

  expect(page.url()).toContain('success=1');
});
