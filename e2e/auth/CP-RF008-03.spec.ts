import { test, expect } from '@playwright/test';

test.describe('CP-RF008-03 - Invalid administrator password (too short)', () => {
  test('should reject password with less than 8 characters', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    await page.waitForURL('/admin', { timeout: 5000 });
    
    await page.click('button:has-text("Create Admin User")');
    
    await expect(page.locator('text=Create New Admin User')).toBeVisible();
    
    await page.fill('input[name="new-username"]', 'shortpwd');
    await page.fill('input[name="new-password"]', 'Ad@1');
    await page.fill('input[name="confirm-password"]', 'Ad@1');
    
    await page.click('button:has-text("Create Admin")');
    
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('text=Password must be at least 8 characters long')).toBeVisible();
  });
});
