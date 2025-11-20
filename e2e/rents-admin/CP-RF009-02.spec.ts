import { test, expect } from '@playwright/test';

test.describe('CP-RF009-02 - Display of rentals with no records', () => {
  test('should show appropriate message when no rentals exist', async ({ page }) => {
    // Log in as admin
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin', { timeout: 5000 });
    
    // Verify we're on admin dashboard
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    // Since there are no rentals in the test environment, verify the empty state message
    const emptyMessage = page.locator('text=No rentals yet.');
    await expect(emptyMessage).toBeVisible();
  });
});
