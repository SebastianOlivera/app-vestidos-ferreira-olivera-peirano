import { test, expect } from '@playwright/test';

test.describe('CP-RF011-05 - Add invalid color (duplicate)', () => {
  test('should not allow saving duplicate color', async ({ page }) => {
    // First, log in as admin
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin', { timeout: 5000 });
    
    // Verify admin dashboard is displayed
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    // Click on Manage Attributes button
    await page.click('button:has-text("Manage Attributes")');
    
    // Wait for attribute manager modal to appear
    await expect(page.locator('text=Attribute Manager')).toBeVisible();
    
    // Colors tab should be selected by default
    // Verify black already exists
    await expect(page.locator('text=black').first()).toBeVisible();
    
    // Try to add duplicate color "black"
    await page.fill('input[placeholder*="color"]', 'black');
    await page.click('button:has-text("Add")');
    
    // Verify error message appears
    await expect(page.locator('text=This color already exists')).toBeVisible();
    
    // Try with different case
    await page.fill('input[placeholder*="color"]', 'BLACK');
    await page.click('button:has-text("Add")');
    
    // Verify error message still appears
    await expect(page.locator('text=This color already exists')).toBeVisible();
  });
});
