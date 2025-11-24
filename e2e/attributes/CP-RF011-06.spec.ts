import { test, expect } from '@playwright/test';

test.describe('CP-RF011-06 - Add invalid style (invalid characters)', () => {
  test('should not allow styles with invalid characters', async ({ page }) => {
    // First, log in as admin
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin', { timeout: 5000 });
    
    // Verify admin dashboard loads correctly
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    // Click on Manage Attributes button
    await page.click('button:has-text("Manage Attributes")');
    
    // Wait for attribute manager modal to appear
    await expect(page.locator('text=Attribute Manager')).toBeVisible();
    
    // Click on Styles tab
    await page.click('button:has-text("Styles")');
    
    // Try to add style with numbers
    await page.fill('input[placeholder*="style"]', 'Style123');
    await page.click('button:has-text("Add")');
    
    // Verify error message appears
    await expect(page.locator('text=Only letters, spaces, and hyphens are allowed')).toBeVisible();
    
    // Try with special characters
    await page.fill('input[placeholder*="style"]', 'Style@#$');
    await page.click('button:has-text("Add")');
    
    // Verify error message appears
    await expect(page.locator('text=Only letters, spaces, and hyphens are allowed')).toBeVisible();
    
    // Try with underscore (should fail)
    await page.fill('input[placeholder*="style"]', 'Style_Name');
    await page.click('button:has-text("Add")');
    
    // Verify error message appears
    await expect(page.locator('text=Only letters, spaces, and hyphens are allowed')).toBeVisible();
  });
});
