import { test, expect } from '@playwright/test';

test.describe('CP-RF009-02 - Display of rentals with no records', () => {
  test('should show appropriate message when no rentals exist', async ({ page }) => {
    // Mock cancellation endpoint to avoid mutating shared data
    await page.route('/api/admin/rentals/cancel', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
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
    
    // Verify "Cancel Rental" section is visible
    await expect(page.locator('h2:has-text("Cancel Rental")')).toBeVisible();
    
    // Get rental table
    const rentalTable = page.locator('table').filter({ has: page.locator('th:has-text("Rental ID")') });

    // Delete all existing rentals from the UI perspective
    const rentalRows = rentalTable.locator('tbody tr').filter({ hasNotText: 'No rentals have been registered' });
    const rentalIds = await rentalRows.evaluateAll((rows) =>
      rows.map((row) => (row.querySelector('td')?.textContent ?? '').trim()).filter(Boolean)
    );

    for (const rentalId of rentalIds) {
      await page.fill('input[name="rentalId"]', rentalId);
      await page.click('button:has-text("Cancel Rental")');
      await expect(rentalRows).toHaveCount(Math.max(rentalIds.length - rentalIds.indexOf(rentalId) - 1, 0));
    }

    // Verify the empty state message is now visible
    await expect(rentalTable.locator('text=No rentals have been registered')).toBeVisible();
  });
});
