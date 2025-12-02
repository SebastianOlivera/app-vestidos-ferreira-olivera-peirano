import { test, expect } from '@playwright/test';

test.describe('CP-RF009-01 - Display of rental list ordered', () => {
  test('should display rentals ordered by pickup date in ascending order', async ({ page }) => {

    // Login
    await page.goto('/admin/login');
    await page.getByRole('textbox', { name: /username/i }).fill('admin');
    await page.getByRole('textbox', { name: /password/i }).fill(process.env.ADMIN_PASSWORD || 'admin123');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Wait until dashboard loads
    await page.getByRole('heading', { name: /admin dashboard/i }).waitFor();

    // Locate Rentals table reliably
    const rentalTable = page
      .locator('section', { hasText: "Scheduled rentals" })
      .locator('table');

    await expect(rentalTable).toBeVisible({ timeout: 10_000 });

    // Locate actual rows (ignoring "no rentals")
    const rows = rentalTable.locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(2);

    // Extract dates
    const startDates = await rows.evaluateAll((trs) =>
      trs.map((tr) => {
        const cell = tr.querySelectorAll('td')[2]; // third column = start date
        const text = cell?.textContent?.trim() || '';
        const [start] = text.split('→').map((s) => s.trim());
        return start;
      })
    );

    // Parse & assert ascending order
    const parsed = startDates.map((d) => new Date(d).getTime());
    for (let i = 1; i < parsed.length; i++) {
      expect(parsed[i]).toBeGreaterThanOrEqual(parsed[i - 1]);
    }
  });
});
