import { test, expect, Page } from '@playwright/test';

function isoFromToday(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

async function syncCsrfCookie(page: Page, selector = 'input[name="csrf"]') {
  const csrf = await page.locator(selector).inputValue();
  const url = new URL(page.url());
  await page.context().addCookies([
    {
      name: 'gr_csrf',
      value: csrf,
      url: `${url.protocol}//${url.host}`,
      path: '/',
    },
  ]);
  return csrf;
}

// CP-RF005-01 — Alquiler válido
// Datos: María Pérez, maria@test.com, tel 099999999, 10/10/2025-12/10/2025
// Usamos fechas relativas para mantener el test estable.
test('permite programar un alquiler con datos válidos', async ({ page }) => {
  await page.goto('/items/5');
  await syncCsrfCookie(page);

  await page.fill('input[name="name"]', 'María Pérez');
  await page.fill('input[name="email"]', 'maria@test.com');
  await page.fill('input[name="phone"]', '099999999');

  const start = isoFromToday(10);
  const end = isoFromToday(12);
  await page.fill('input[name="start"]', start);
  await page.fill('input[name="end"]', end);

  await page.getByRole('button', { name: 'Request rental' }).click();

  await expect(page).toHaveURL(/\/items\/5/);
  await expect(page.locator(`[title="${start}"]`)).toContainText('Booked');
});
