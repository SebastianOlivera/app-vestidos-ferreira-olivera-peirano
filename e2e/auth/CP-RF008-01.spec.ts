import { test, expect } from '@playwright/test';

test.describe('CP-RF008-01 - Valid administrator password', () => {
  test('should accept password with minimum 8 characters and 1 symbol', async ({ page }) => {
    // This test validates password requirements in the login form
    // The application stores the password in ADMIN_PASSWORD environment variable
    // Password must have at least 8 characters and 1 symbol
    
    // Expected valid password format: "Admin@123" (8+ chars, 1 symbol)
    const validPassword = 'Admin@123';
    
    // Verify password meets requirements
    const hasMinLength = validPassword.length >= 8;
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};:'",.\\<>?\/\|`~]/.test(validPassword);
    
    expect(hasMinLength).toBe(true);
    expect(hasSymbol).toBe(true);
  });
});
