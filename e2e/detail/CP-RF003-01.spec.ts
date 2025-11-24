import { test, expect } from '@playwright/test';

// CP-RF003-01 — Detalle de artículo válido
test('muestra detalle completo de un artículo válido', async ({ page }) => {
  await page.goto('/items/1');

  await expect(page.getByRole('heading', { name: 'Silk Evening Gown' })).toBeVisible();
  await expect(page.getByText('From $79/day')).toBeVisible();
  await expect(page.getByText('Sizes: XS, S, M, L')).toBeVisible();
  await expect(page.getByText('Color: champagne', { exact: false })).toBeVisible();

  await expect(page.getByText('Availability')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Schedule a rental' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Request rental' })).toBeEnabled();
});
