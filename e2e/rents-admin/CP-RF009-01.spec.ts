import { test, expect } from '@playwright/test';

test.describe('CP-RF009-01 - Display of rental list ordered', () => {
  test('should display rentals ordered by creation date in descending order', async ({ page }) => {
    // Log in as admin
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    // Wait for redirect to admin dashboard
    await page.waitForURL('/admin', { timeout: 5000 });
    
    // Verify we're on admin dashboard
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    // Verify "Scheduled rentals" section is visible
    const rentalsHeading = page.locator('text=Scheduled rentals');
    await expect(rentalsHeading).toBeVisible();
    
    // Verify rental table structure
    const rentalTable = page.locator('table').filter({ has: page.locator('th:has-text("Rental ID")') });
    await expect(rentalTable).toBeVisible();
    
    // Get all rental rows (excluding header)
    const rows = rentalTable.locator('tbody tr');
    await expect(rows).toHaveCount(3);
    
    // Verify the order by checking customer names
    // Expected order (by createdAt descending):
    // 1. Ana Rodríguez (2025-11-22T14:15:00.000Z) - most recent
    // 2. Lucía Fernández (2025-11-21T16:45:00.000Z)
    // 3. María González (2025-11-20T10:30:00.000Z) - oldest
    
    const firstRow = rows.nth(0);
    await expect(firstRow).toContainText('Ana Rodríguez');
    
    const secondRow = rows.nth(1);
    await expect(secondRow).toContainText('Lucía Fernández');
    
    const thirdRow = rows.nth(2);
    await expect(thirdRow).toContainText('María González');
  });
});
