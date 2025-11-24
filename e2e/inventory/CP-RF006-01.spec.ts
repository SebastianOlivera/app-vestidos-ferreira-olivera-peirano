import { test, expect, Page } from '@playwright/test';

async function syncCsrfCookie(page: Page, selector = 'input[name="csrf"]') {
  const csrf = await page.locator(selector).inputValue();
  const url = new URL(page.url());
  await page.context().addCookies([
    { name: 'gr_csrf', value: csrf, url: `${url.protocol}//${url.host}`, path: '/' },
  ]);
  return csrf;
}

// CP-RF006-01 — Alta de artículo válido
test('admin puede agregar un artículo válido al catálogo', async ({ page }) => {
  await page.context().addCookies([
    { name: 'gr_admin', value: 'admin-session', url: 'http://localhost:3000', path: '/' },
  ]);

  await page.goto('/admin');
  await syncCsrfCookie(page, 'input[name="csrf"]');

  await page.fill('input[name="name"]', 'Verano Azul');
  await page.fill('input[name="category"]', 'dress');
  await page.fill('input[name="sizes"]', 'M');
  await page.fill('input[name="color"]', 'Azul');
  await page.fill('input[name="pricePerDay"]', '1000');

  await page.getByRole('button', { name: 'Guardar' }).click();

  await expect(page.getByText('Verano Azul')).toBeVisible();
});
