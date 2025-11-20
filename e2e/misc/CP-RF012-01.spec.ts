import { test, expect } from '@playwright/test';

test.describe('CP-RF012-01 - FAQ visualization', () => {
  test('should display all questions and answers in FAQ section', async ({ page }) => {
    // Access the FAQ section
    await page.goto('/faq');
    
    // Verify page title
    await expect(page.locator('text=Preguntas Frecuentes')).toBeVisible();
    
    // Verify FAQ questions are displayed
    const faqItems = await page.locator('div:has(> h2)').all();
    expect(faqItems.length).toBeGreaterThan(0);
    
    // Verify specific FAQ questions are visible
    await expect(page.locator('text=¿Cómo funciona el alquiler?')).toBeVisible();
    await expect(page.locator('text=¿Incluye limpieza?')).toBeVisible();
    await expect(page.locator('text=¿Cuánto tiempo puedo alquilar?')).toBeVisible();
    await expect(page.locator('text=¿Necesito crear una cuenta?')).toBeVisible();
  });
});
