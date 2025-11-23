import { test, expect } from '@playwright/test';

test.describe('CP-RF010-01 - Cancellation of valid rental', () => {
  test('should cancel existing rental and free the dates', async ({ page }) => {
    // Log in as admin
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin', { timeout: 5000 });
    
    // Verify we're on admin dashboard
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    // Verify rental table has rentals
    const rentalTable = page.locator('table').filter({ has: page.locator('th:has-text("Rental ID")') });
    await expect(rentalTable).toBeVisible();
    
    // Get the initial count of rentals
    const initialRows = rentalTable.locator('tbody tr').filter({ hasNotText: 'No rentals yet.' });
    const initialCount = await initialRows.count();
    expect(initialCount).toBeGreaterThan(0);
    
    // Verify Cancel Rental section is visible
    await expect(page.locator('h2:has-text("Cancel Rental")')).toBeVisible();
    
    // Enter the rental ID in the cancel form (using rental ID "2")
    await page.fill('input[name="rentalId"]', '2');
    
    // Click Cancel Rental button
    await page.click('button:has-text("Cancel Rental")');
    
    // Wait for the rental to be removed from the list
    await page.waitForTimeout(1000);
    
    // Verify the rental was removed from the table
    const updatedRows = rentalTable.locator('tbody tr').filter({ hasNotText: 'No rentals yet.' });
    const updatedCount = await updatedRows.count();
    expect(updatedCount).toBe(initialCount - 1);
  });
});
