import { test, expect } from '@playwright/test';

test.describe('CP-RF011-03 - Add valid style', () => {
  test('should add valid style successfully', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    await page.waitForURL('/admin', { timeout: 5000 });
    
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    await page.click('button:has-text("Manage Attributes")');
    
    await expect(page.locator('text=Attribute Manager')).toBeVisible();
    
    await page.click('button:has-text("Styles")');
    
    await page.fill('input[placeholder*="style"]', 'Fiesta');
    await page.click('button:has-text("Add")');
    
    await expect(page.locator('text=fiesta').first()).toBeVisible();
    
    await page.click('button:has-text("Close")');
    
    await page.click('button:has-text("Add New Dress")');
    
    const styleSelect = page.locator('select').filter({ has: page.locator('option:has-text("Fiesta")') });
    await expect(styleSelect).toBeVisible();
  });
});
