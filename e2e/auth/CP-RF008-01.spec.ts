import { test, expect } from '@playwright/test';

test.describe('CP-RF008-01 - Valid administrator password', () => {
  test('should accept password with minimum 8 characters and 1 symbol', async ({ page }) => {
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
    
    // Fill in the form with valid password (8+ chars, 1 symbol)
    await page.fill('input[name="new-username"]', 'newadmin');
    await page.fill('input[name="new-password"]', 'Admin@123');
    await page.fill('input[name="confirm-password"]', 'Admin@123');
    
    // Submit the form
    await page.click('button:has-text("Create Admin")');
    
    // Verify success message appears (no error)
    await expect(page.locator('text=Admin user "newadmin" created successfully')).toBeVisible({ timeout: 3000 });
  });
});
