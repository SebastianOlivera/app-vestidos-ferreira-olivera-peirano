import { test, expect } from '@playwright/test';

// CP-RF003-02 — Artículo eliminado
// Validar que se muestre el mensaje adecuado cuando se accede a un artículo inexistente.
test('muestra mensaje de artículo no disponible cuando el ID no existe', async ({ page }) => {
  await page.goto('/items/9999');

  await expect(page.getByRole('heading', { name: 'Artículo no disponible' })).toBeVisible();
  await expect(page.getByText('No pudimos encontrar el artículo')).toBeVisible();
});
