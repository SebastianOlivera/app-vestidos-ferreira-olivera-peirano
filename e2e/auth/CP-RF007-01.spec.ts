import { test, expect } from '@playwright/test';

test.describe('CP-RF007-01 - Successful login with valid credentials', () => {
  test('should allow admin to login with correct credentials', async ({ page }) => {
    await page.goto('/admin/login');
    
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin123');
    
    await page.click('button:has-text("Sign in")');
    
    await page.waitForURL('/admin', { timeout: 5000 });
    expect(page.url()).toBe('http://localhost:3000/admin');
  });
});
