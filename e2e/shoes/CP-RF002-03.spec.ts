import { test, expect } from '@playwright/test';

// CP-RF002-03 — Búsqueda sin filtros
test('muestra el catálogo de zapatos sin filtros', async ({ page }) => {
  await page.goto('/search?category=shoes');
  await page.getByRole('button', { name: /Search/i }).click();

  await expect(page.getByText('Zapatos Negros Clásicos')).toBeVisible();
  await expect(page.getByText('Zapatillas Blancas Urbanas')).toBeVisible();
});
