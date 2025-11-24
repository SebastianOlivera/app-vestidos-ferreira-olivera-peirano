import { test, expect } from '@playwright/test';

test.describe('CP-RF011-02 - Add valid color', () => {
  test('should add valid color successfully', async ({ page }) => {
    // First, log in as admin
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin', { timeout: 5000 });
    
    // Verify admin dashboard displays items with colors
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    // Click on Manage Attributes button
    await page.click('button:has-text("Manage Attributes")');
    
    // Wait for attribute manager modal to appear
    await expect(page.locator('text=Attribute Manager')).toBeVisible();
    
    // Colors tab should be selected by default
    await expect(page.locator('button:has-text("Colors").bg-blue-600, button:has-text("Colors")[class*="bg-blue"]')).toBeVisible();
    
    // Add new color "Bordo"
    await page.fill('input[placeholder*="color"]', 'Bordo');
    await page.click('button:has-text("Add")');
    
    // Verify bordo appears in the current colors list (lowercase)
    await expect(page.locator('text=bordo').first()).toBeVisible();
    
    // Close attribute manager
    await page.click('button:has-text("Close")');
    
    // Open Add New Dress form
    await page.click('button:has-text("Add New Dress")');
    
    // Verify bordo is available in the color dropdown
    const colorSelect = page.locator('select').filter({ has: page.locator('option:has-text("Bordo")') });
    await expect(colorSelect).toBeVisible();
  });
});
