import { test, expect } from '@playwright/test';

test.describe('CP-RF008-02 - Invalid administrator password (no symbol)', () => {
  test('should reject password without symbol', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    await page.waitForURL('/admin', { timeout: 5000 });
    
    await page.click('button:has-text("Create Admin User")');
    
    await expect(page.locator('text=Create New Admin User')).toBeVisible();
    
    await page.fill('input[name="new-username"]', 'testuser');
    await page.fill('input[name="new-password"]', 'Admin2025');
    await page.fill('input[name="confirm-password"]', 'Admin2025');
    
    await page.click('button:has-text("Create Admin")');
    
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('text=Password must contain at least one symbol')).toBeVisible();
  });
});
