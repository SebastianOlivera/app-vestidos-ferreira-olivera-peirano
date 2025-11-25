import { test, expect } from '@playwright/test';

test.describe('CP-RF009-01 - Display of rental list ordered', () => {
  test('should display rentals ordered by pickup date in ascending order', async ({ page }) => {
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

    // Collect start dates from all rentals (excluding the "no rentals" row)
    const rows = rentalTable.locator('tbody tr').filter({ hasNotText: 'No rentals have been registered' });
    const rowsCount = await rows.count();
    expect(rowsCount).toBeGreaterThan(2);

    const startDates = await rows.evaluateAll((rowElements) =>
      rowElements.map((row) => {
        const datesCell = row.querySelector('td:nth-child(3)');
        const rawDates = datesCell?.textContent ?? '';
        const [startDate] = rawDates.split('→').map((s) => s.trim());
        return startDate;
      })
    );

    // Validate ascending order by comparing each pair of consecutive dates
    for (let i = 1; i < startDates.length; i++) {
      const previous = startDates[i - 1];
      const current = startDates[i];
      expect(new Date(previous).getTime()).toBeLessThanOrEqual(new Date(current).getTime());
    }
  });
});
