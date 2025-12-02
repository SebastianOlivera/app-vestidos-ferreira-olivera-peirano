import { test, expect } from '@playwright/test';

test.describe('CP-RF011-04 - Add invalid size (empty)', () => {
  test('should not allow saving empty size', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    await page.waitForURL('/admin', { timeout: 5000 });
    
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    await page.click('button:has-text("Manage Attributes")');
    
    await expect(page.locator('text=Attribute Manager')).toBeVisible();
    
    await page.click('button:has-text("Sizes")');
    
    await page.click('button:has-text("Add")');
    
    await expect(page.locator('text=Value cannot be empty')).toBeVisible();
    
    await page.fill('input[placeholder*="size"]', '   ');
    await page.click('button:has-text("Add")');
    
    await expect(page.locator('text=Value cannot be empty')).toBeVisible();
  });
});
