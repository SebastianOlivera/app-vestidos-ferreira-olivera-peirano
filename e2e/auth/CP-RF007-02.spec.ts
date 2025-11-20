import { test, expect } from '@playwright/test';

test.describe('CP-RF007-02 - Failed login with invalid credentials', () => {
  test('should deny access with incorrect password', async ({ page }) => {
    // Access the admin login page
    await page.goto('/admin/login');
    
    // Enter valid username and incorrect password
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'wrongpassword');
    
    // Submit login form
    await page.click('button:has-text("Sign in")');
    
    // Verify the form is still on login page (no redirect happened)
    await page.waitForTimeout(1000);
    expect(page.url()).toContain('/admin/login');
  });
});
