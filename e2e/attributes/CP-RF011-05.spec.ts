import { test, expect } from '@playwright/test';

test.describe('CP-RF011-05 - Add invalid color (duplicate)', () => {
  test('should not allow saving duplicate color', async ({ page }) => {
    await page.goto('/admin/login');
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    await page.click('button:has-text("Sign in")');
    
    await page.waitForURL('/admin', { timeout: 5000 });
    
    await expect(page.locator('text=Admin dashboard')).toBeVisible();
    
    await page.click('button:has-text("Manage Attributes")');
    
    await expect(page.locator('text=Attribute Manager')).toBeVisible();
    
    await expect(page.locator('text=black').first()).toBeVisible();
    
    await page.fill('input[placeholder*="color"]', 'black');
    await page.click('button:has-text("Add")');
    
    await expect(page.locator('text=This color already exists')).toBeVisible();
    
    await page.fill('input[placeholder*="color"]', 'BLACK');
    await page.click('button:has-text("Add")');
    
    await expect(page.locator('text=This color already exists')).toBeVisible();
  });
});
