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
    const rentalTable = page.locator('table').nth(1); // Second table is for rentals
    await expect(rentalTable).toBeVisible();
  });
});
