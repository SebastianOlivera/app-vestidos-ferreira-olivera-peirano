import { test, expect } from '@playwright/test';

test.describe('CP-RF010-02 - Cancellation of nonexistent rental', () => {
  test('should show error when attempting to cancel nonexistent rental', async ({ page }) => {
    // Mock cancellation endpoint to return not found
    await page.route('/api/admin/rentals/cancel', async (route) => {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Rental not found' }),
      });
    });

    // Log in as admin
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin', { timeout: 5000 });
    
    // Verify we're on admin dashboard
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    // Verify the cancel section exists
    await expect(page.locator('h2:has-text("Cancel Rental")')).toBeVisible();
    
    // Try to cancel with a fake rental ID
    const fakeRentalId = '99999';
    await page.fill('input[name="rentalId"]', fakeRentalId);
    await page.click('button:has-text("Cancel Rental")');
    
    // Verify error message is displayed
    const errorMessage = page.locator('[data-testid="cancel-error"]');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
    await expect(errorMessage).toContainText('Rental not found');
  });
});
