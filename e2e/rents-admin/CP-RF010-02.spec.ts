import { test, expect } from '@playwright/test';

test.describe('CP-RF010-02 - Cancellation of nonexistent rental', () => {
  test('should show error when attempting to cancel nonexistent rental', async ({ page }) => {
    // Log in as admin
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin', { timeout: 5000 });
    
    // Verify we're on admin dashboard
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    // Attempt to cancel a nonexistent rental via API
    const response = await page.request.post('/api/admin/rentals/99999/cancel');
    
    // Verify the request returns 404 error
    expect(response.status()).toBe(404);
    const errorBody = await response.json();
    expect(errorBody.error).toBe('Not found');
  });
});
