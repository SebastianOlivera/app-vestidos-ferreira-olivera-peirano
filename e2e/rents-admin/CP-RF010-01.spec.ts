import { test, expect } from '@playwright/test';

test.describe('CP-RF010-01 - Cancellation of valid rental', () => {
  test('should cancel existing rental and free the dates', async ({ page }) => {
    await page.route('/api/admin/rentals/cancel', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    await page.waitForURL('/admin', { timeout: 5000 });
    
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    const rentalTable = page.locator('table').filter({ has: page.locator('th:has-text("Rental ID")') });
    await expect(rentalTable).toBeVisible();

    const rentalRows = rentalTable.locator('tbody tr').filter({ hasNotText: 'No rentals have been registered' });
    const firstRentalId = await rentalRows.nth(0).locator('td').first().textContent();
    expect(firstRentalId?.trim()).toBeTruthy();

    const initialCount = await rentalRows.count();
    expect(initialCount).toBeGreaterThan(0);

    await expect(page.locator('h2:has-text("Cancel Rental")')).toBeVisible();

    await page.fill('input[name="rentalId"]', firstRentalId!.trim());

    await page.click('button:has-text("Cancel Rental")');

    await expect(rentalRows).toHaveCount(initialCount - 1);
  });
});
