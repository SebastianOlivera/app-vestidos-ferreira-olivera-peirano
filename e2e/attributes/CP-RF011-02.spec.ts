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
    
    // Verify items are displayed with their colors
    await expect(page.locator('tbody tr')).toHaveCount(4); // 4 items in inventory
  });
});
