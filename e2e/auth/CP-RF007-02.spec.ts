import { test, expect } from '@playwright/test';

test.describe('CP-RF007-02 - Failed login with invalid credentials', () => {
  test('should deny access with incorrect password', async ({ page }) => {
    await page.goto('/admin/login');
    
    await page.fill('input[name="username"]', 'admin');
    await page.fill('input[name="password"]', 'wrongpassword');
    
    await page.click('button:has-text("Sign in")');
    
    const errorMessage = page.locator('[data-testid="login-error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Invalid credentials');
    
    expect(page.url()).toContain('/admin/login');
  });
});
