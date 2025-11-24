import { test, expect } from '@playwright/test';

// CP-RF002-02 — Filtros inválidos
test('muestra mensaje cuando no hay zapatos para una talla inexistente', async ({ page }) => {
  await page.goto('/search?category=shoes');

  await page.fill('input[name="size"]', '100');
  await page.getByRole('button', { name: /Search/i }).click();

  await expect(page.getByText('No se encontraron resultados.')).toBeVisible();
});
