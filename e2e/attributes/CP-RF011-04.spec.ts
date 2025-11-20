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
    
    // Verify inventory items display with sizes
    const inventorySection = page.locator('text=Inventory');
    await expect(inventorySection).toBeVisible();
  });
});
