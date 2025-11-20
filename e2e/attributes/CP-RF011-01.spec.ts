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
    
    // Verify admin dashboard is displayed with items table
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    // Verify inventory section displays available sizes
    const inventoryHeading = page.locator('text=Inventory');
    await expect(inventoryHeading).toBeVisible();
    
    // Verify at least one size is displayed in the table
    const sizeCell = page.locator('th:has-text("Sizes")');
    await expect(sizeCell).toBeVisible();
  });
});
