import { test, expect } from '@playwright/test';

test.describe('CP-RF011-02 - Add valid color', () => {
  test('should add valid color successfully', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    await page.waitForURL('/admin', { timeout: 5000 });
    
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    await page.click('button:has-text("Manage Attributes")');
    
    await expect(page.locator('text=Attribute Manager')).toBeVisible();
    
    await expect(page.locator('button:has-text("Colors").bg-blue-600, button:has-text("Colors")[class*="bg-blue"]')).toBeVisible();
    
    await page.fill('input[placeholder*="color"]', 'Bordo');
    await page.click('button:has-text("Add")');
    
    await expect(page.locator('text=bordo').first()).toBeVisible();
    
    await page.click('button:has-text("Close")');
    
    await page.click('button:has-text("Add New Dress")');
    
    const colorSelect = page.locator('select').filter({ has: page.locator('option:has-text("Bordo")') });
    await expect(colorSelect).toBeVisible();
  });
});
