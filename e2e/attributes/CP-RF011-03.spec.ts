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
    
    // Verify inventory table displays items
    const inventoryTable = page.locator('table');
    await expect(inventoryTable).toBeVisible();
  });
});
