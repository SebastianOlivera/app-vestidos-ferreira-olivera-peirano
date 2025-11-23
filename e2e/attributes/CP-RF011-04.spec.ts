import { test, expect } from '@playwright/test';

test.describe('CP-RF011-04 - Add invalid size (empty)', () => {
  test('should not allow saving empty size', async ({ page }) => {
    // First, log in as admin
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin', { timeout: 5000 });
    
    // Verify we're on admin dashboard
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    // Click on Manage Attributes button
    await page.click('button:has-text("Manage Attributes")');
    
    // Wait for attribute manager modal to appear
    await expect(page.locator('text=Attribute Manager')).toBeVisible();
    
    // Click on Sizes tab
    await page.click('button:has-text("Sizes")');
    
    // Try to add empty size by clicking Add without typing anything
    await page.click('button:has-text("Add")');
    
    // Verify error message appears
    await expect(page.locator('text=Value cannot be empty')).toBeVisible();
    
    // Try with just spaces
    await page.fill('input[placeholder*="size"]', '   ');
    await page.click('button:has-text("Add")');
    
    // Verify error message still appears
    await expect(page.locator('text=Value cannot be empty')).toBeVisible();
  });
});
