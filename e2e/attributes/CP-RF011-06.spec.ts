import { test, expect } from '@playwright/test';

test.describe('CP-RF011-06 - Add invalid style (invalid characters)', () => {
  test('should not allow styles with invalid characters', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    await page.waitForURL('/admin', { timeout: 5000 });
    
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    await page.click('button:has-text("Manage Attributes")');
    
    await expect(page.locator('text=Attribute Manager')).toBeVisible();
    
    await page.click('button:has-text("Styles")');
    
    await page.fill('input[placeholder*="style"]', 'Style123');
    await page.click('button:has-text("Add")');
    
    await expect(page.locator('text=Only letters, spaces, and hyphens are allowed')).toBeVisible();
    
    await page.fill('input[placeholder*="style"]', 'Style@#$');
    await page.click('button:has-text("Add")');
    
    await expect(page.locator('text=Only letters, spaces, and hyphens are allowed')).toBeVisible();
    
    await page.fill('input[placeholder*="style"]', 'Style_Name');
    await page.click('button:has-text("Add")');
    
    await expect(page.locator('text=Only letters, spaces, and hyphens are allowed')).toBeVisible();
  });
});
