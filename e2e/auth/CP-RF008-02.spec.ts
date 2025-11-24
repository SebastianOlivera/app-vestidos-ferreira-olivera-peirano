import { test, expect } from '@playwright/test';

test.describe('CP-RF008-02 - Invalid administrator password (no symbol)', () => {
  test('should reject password without symbol', async ({ page }) => {
    // Log in as admin
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin', { timeout: 5000 });
    
    // Click on Create Admin User button
    await page.click('button:has-text("Create Admin User")');
    
    // Wait for modal to appear
    await expect(page.locator('text=Create New Admin User')).toBeVisible();
    
    // Fill in the form with password without symbol (8+ chars but no symbol)
    await page.fill('input[name="new-username"]', 'testuser');
    await page.fill('input[name="new-password"]', 'Admin2025');
    await page.fill('input[name="confirm-password"]', 'Admin2025');
    
    // Submit the form
    await page.click('button:has-text("Create Admin")');
    
    // Verify error message appears
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('text=Password must contain at least one symbol')).toBeVisible();
  });
});
