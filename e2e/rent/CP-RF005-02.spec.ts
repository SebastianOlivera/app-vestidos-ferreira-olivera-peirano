import { test, expect } from '@playwright/test';

function isoFromToday(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

// CP-RF005-02 — Datos inválidos (email sin @)
test('rechaza alquiler cuando el email es inválido', async ({ request }) => {
  const start = isoFromToday(15);
  const end = isoFromToday(18);
  const csrf = `csrf-${Date.now()}`;

  const response = await request.post('/api/rentals', {
    headers: { cookie: `gr_csrf=${csrf}` },
    form: {
      csrf,
      itemId: '5',
      name: 'Ana López',
      email: 'anaemail.com',
      phone: '',
      start,
      end,
    },
  });

  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.error).toBeDefined();
});
