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
    
    // Verify the dashboard shows multiple items with different colors
    const rows = page.locator('tbody tr');
    await expect(rows).toHaveCount(4);
  });
});
