import { test, expect } from '@playwright/test';

// CP-RF006-02 — Eliminar artículo inexistente
test('responde con mensaje de no encontrado al eliminar artículo inexistente', async ({ request }) => {
  const csrf = `csrf-${Date.now()}`;
  const response = await request.post('/api/admin/items', {
    headers: { cookie: `gr_admin=admin-session; gr_csrf=${csrf}` },
    form: { csrf, mode: 'delete', id: '9999' },
  });

  expect(response.status()).toBe(404);
  const body = await response.json();
  expect(body.error).toBe('Artículo no encontrado');
});
