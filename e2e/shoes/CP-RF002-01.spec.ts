import { test, expect } from '@playwright/test';

// CP-RF002-01 — Búsqueda de zapatos por color y talla
// color=Negro, talla=38
// Resultado esperado: Solo se muestran zapatos negros talla 38.
test('filtra zapatos por color Negro y talla 38', async ({ page }) => {
  await page.goto('/search?category=shoes');

  await page.fill('input[name="color"]', 'Negro');
  await page.fill('input[name="size"]', '38');
  await page.getByRole('button', { name: /Search/i }).click();

  const resultados = page.locator('div', { hasText: 'Zapatos Negros Clásicos' });
  await expect(resultados).toHaveCount(1);
  await expect(page.getByText('Zapatillas Blancas Urbanas')).toHaveCount(0);
});
