import { test, expect } from '@playwright/test';

test.describe('CP-RF008-01 - Valid administrator password', () => {
  test('should accept password with minimum 8 characters and 1 symbol', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    await page.waitForURL('/admin', { timeout: 5000 });
    
    await page.click('button:has-text("Create Admin User")');
    
    await expect(page.locator('text=Create New Admin User')).toBeVisible();
    
    await page.fill('input[name="new-username"]', 'newadmin');
    await page.fill('input[name="new-password"]', 'Admin@123');
    await page.fill('input[name="confirm-password"]', 'Admin@123');
    
    await page.click('button:has-text("Create Admin")');
    
    await expect(page.locator('text=Admin user "newadmin" created successfully')).toBeVisible({ timeout: 3000 });
  });
});
