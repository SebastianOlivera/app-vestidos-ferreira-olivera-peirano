import { test, expect, Page } from '@playwright/test';

async function syncCsrfCookie(page: Page, selector = 'input[name="csrf"]') {
  const csrf = await page.locator(selector).inputValue();
  const url = new URL(page.url());
  await page.context().addCookies([
    { name: 'gr_csrf', value: csrf, url: `${url.protocol}//${url.host}`, path: '/' },
  ]);
  return csrf;
}

// CP-RF006-03 — Edición de artículo
test('permite editar el precio de un artículo existente', async ({ page }) => {
  await page.context().addCookies([
    { name: 'gr_admin', value: 'admin-session', url: 'http://localhost:3000', path: '/' },
  ]);

  await page.goto('/admin');
  await syncCsrfCookie(page, 'input[name="csrf"]');

  await page.fill('form:has(input[name="mode"][value="update-price"]) input[name="id"]', '5');
  await page.fill('form:has(input[name="mode"][value="update-price"]) input[name="pricePerDay"]', '1200');
  await page.locator('form:has(input[name="mode"][value="update-price"]) button').click();

  await expect(page.getByText('$1200')).toBeVisible();
});
