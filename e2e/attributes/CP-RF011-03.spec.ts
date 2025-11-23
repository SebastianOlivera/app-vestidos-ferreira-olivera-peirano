import { test, expect } from '@playwright/test';

test.describe('CP-RF011-03 - Add valid style', () => {
  test('should add valid style successfully', async ({ page }) => {
    // First, log in as admin
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin', { timeout: 5000 });
    
    // Verify admin dashboard displays items with styles
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    // Click on Manage Attributes button
    await page.click('button:has-text("Manage Attributes")');
    
    // Wait for attribute manager modal to appear
    await expect(page.locator('text=Attribute Manager')).toBeVisible();
    
    // Click on Styles tab
    await page.click('button:has-text("Styles")');
    
    // Add new style "Fiesta"
    await page.fill('input[placeholder*="style"]', 'Fiesta');
    await page.click('button:has-text("Add")');
    
    // Verify fiesta appears in the current styles list (lowercase)
    await expect(page.locator('text=fiesta').first()).toBeVisible();
    
    // Close attribute manager
    await page.click('button:has-text("Close")');
    
    // Open Add New Dress form
    await page.click('button:has-text("Add New Dress")');
    
    // Verify fiesta is available in the style dropdown
    const styleSelect = page.locator('select').filter({ has: page.locator('option:has-text("Fiesta")') });
    await expect(styleSelect).toBeVisible();
  });
});
