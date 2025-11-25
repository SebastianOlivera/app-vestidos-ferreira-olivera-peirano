import { test, expect } from '@playwright/test';

test('CP-RF005-02: Reject rental with invalid email', async ({ page }) => {
  await page.goto('/items/1');

  await page.getByLabel('Full name').fill('Ana López');
  await page.getByLabel('Email').fill('anaemail.com'); // sin @
  await page.getByLabel('Phone').fill('+598866674');
  await page.getByLabel('Start date').fill('2026-10-15');
  await page.getByLabel('End date').fill('2026-10-18');
  await page.click('button:has-text("Request rental")');

  // 1) Chequear estado de validación
  const emailInput = page.getByLabel('Email');

  const validationMessage = await emailInput.evaluate(
    el => (el as HTMLInputElement).validationMessage
  );

  // 2) Debe contener el texto del popup del navegador
  expect(validationMessage).toContain('@');

  // 3) Debe ser inválido
  const validity = await emailInput.evaluate(el => (el as HTMLInputElement).validity.typeMismatch);
  expect(validity).toBe(true);
});
