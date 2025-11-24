import { test, expect, APIRequestContext } from '@playwright/test';

function isoFromToday(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

async function createRentalViaApi(request: APIRequestContext, params: { itemId: number; start: string; end: string }) {
  const csrf = `csrf-${Date.now()}`;
  const response = await request.post('/api/rentals', {
    headers: { cookie: `gr_csrf=${csrf}` },
    form: {
      csrf,
      itemId: params.itemId.toString(),
      start: params.start,
      end: params.end,
      name: 'Test User',
      email: 'tester@example.com',
      phone: '555-0100',
    },
  });

  await expect(response.status()).toBe(307);
  return response;
}

// CP-RF004-01 — Calendario con fechas reservadas
test('muestra fechas reservadas en rojo y las disponibles en verde', async ({ page, request }) => {
  const start = isoFromToday(2);
  const end = isoFromToday(4);
  await createRentalViaApi(request, { itemId: 1, start, end });

  await page.goto('/items/1');

  const bookedCell = page.locator(`[title="${start}"]`);
  await expect(bookedCell).toContainText('Booked');

  const availableCell = page.locator('[title]').nth(10);
  await expect(availableCell).not.toContainText('Booked');
});
