import { test, expect } from '@playwright/test';

// CP-RF004-02 — Calendario sin reservas
test('muestra todas las fechas disponibles cuando no hay reservas', async ({ page }) => {
  await page.goto('/items/5');

  const bookedBadges = page.getByText('Booked');
  await expect(bookedBadges).toHaveCount(0);
});
