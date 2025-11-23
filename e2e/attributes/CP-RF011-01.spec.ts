import { test, expect } from '@playwright/test';

test.describe('CP-RF011-01 - Add valid size', () => {
  test('should add valid size successfully', async ({ page }) => {
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
    
    // Click on Sizes tab
    await page.click('button:has-text("Sizes")');
    
    // Verify XXS doesn't exist yet
    await expect(page.locator('text=XXS').first()).not.toBeVisible();
    
    // Add new size "XXS"
    await page.fill('input[placeholder*="size"]', 'XXS');
    await page.click('button:has-text("Add")');
    
    // Verify XXS appears in the current sizes list
    await expect(page.locator('text=XXS').first()).toBeVisible();
    
    // Close attribute manager
    await page.click('button:has-text("Close")');
    
    // Open Add New Dress form
    await page.click('button:has-text("Add New Dress")');
    
    // Verify XXS is available in the sizes checkboxes
    await expect(page.locator('label:has-text("XXS")')).toBeVisible();
  });
});
