import { test, expect } from '@playwright/test';

test.describe('CP-RF012-01 - FAQ visualization', () => {
  test('should display all questions and answers in FAQ section', async ({ page }) => {
    await page.goto('/faq');
    
    await expect(page.locator('text=Preguntas Frecuentes')).toBeVisible();
    
    const faqItems = await page.locator('[data-testid="faq-question"]').all();
    expect(faqItems.length).toBeGreaterThan(0);
    
    await expect(page.locator('text=¿Cómo funciona el alquiler?')).toBeVisible();
    await expect(page.locator('text=¿Incluye limpieza?')).toBeVisible();
    await expect(page.locator('text=¿Cuánto tiempo puedo alquilar?')).toBeVisible();
    await expect(page.locator('text=¿Necesito crear una cuenta?')).toBeVisible();
  });
});
