import { test, expect } from '@playwright/test';

function isoFromToday(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

// CP-RF005-03 — Rango de fechas inválido
test('impide reservar cuando la fecha de inicio es posterior a la de fin', async ({ request }) => {
  const start = isoFromToday(12);
  const end = isoFromToday(10);
  const csrf = `csrf-${Date.now()}`;

  const response = await request.post('/api/rentals', {
    headers: { cookie: `gr_csrf=${csrf}` },
    form: {
      csrf,
      itemId: '5',
      name: 'Cliente Prueba',
      email: 'cliente@test.com',
      phone: '123456',
      start,
      end,
    },
  });

  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.error).toContain('End date must be after start date');
});
