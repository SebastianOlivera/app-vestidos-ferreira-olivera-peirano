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
    
    // Verify "Cancel Rental" section is visible
    await expect(page.locator('h2:has-text("Cancel Rental")')).toBeVisible();
    
    // Get rental table
    const rentalTable = page.locator('table').filter({ has: page.locator('th:has-text("Rental ID")') });
    
    // Delete all existing rentals
    const rentalRows = rentalTable.locator('tbody tr').filter({ hasNotText: 'No rentals yet.' });
    const rentalCount = await rentalRows.count();
    
    for (let i = 0; i < rentalCount; i++) {
      // Get the first rental ID (since the table updates after each deletion)
      const firstRow = rentalTable.locator('tbody tr').first();
      const rentalId = await firstRow.locator('td').first().textContent();
      
      if (rentalId) {
        // Cancel the rental
        await page.fill('input[name="rentalId"]', rentalId.trim());
        await page.click('button:has-text("Cancel Rental")');
        
        // Wait a bit for the deletion to complete
        await page.waitForTimeout(500);
      }
    }
    
    // Verify the empty state message is now visible
    const emptyMessage = rentalTable.locator('text=No rentals yet.');
    await expect(emptyMessage).toBeVisible();
  });
});
