import { test, expect } from '@playwright/test';

test.describe('CP-RF011-01 - Add valid size', () => {
  test('should add valid size successfully', async ({ page }) => {

    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    await page.waitForURL('/admin', { timeout: 5000 });
    
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    await page.click('button:has-text("Manage Attributes")');
    
    await expect(page.locator('text=Attribute Manager')).toBeVisible();
    
    await page.click('button:has-text("Sizes")');
    
    await expect(page.locator('text=XXS').first()).not.toBeVisible();
    
    await page.fill('input[placeholder*="size"]', 'XXS');
    await page.click('button:has-text("Add")');
    
    await expect(page.locator('text=XXS').first()).toBeVisible();
    
    await page.click('button:has-text("Close")');
    
    await page.click('button:has-text("Add New Dress")');
    
    await expect(page.locator('label:has-text("XXS")')).toBeVisible();
  });
});
