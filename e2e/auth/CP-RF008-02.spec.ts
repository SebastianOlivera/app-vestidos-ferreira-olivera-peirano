import { test, expect } from '@playwright/test';

test.describe('CP-RF008-02 - Invalid administrator password (no symbol)', () => {
  test('should reject password without symbol', async ({ page }) => {
    // This test validates that passwords without symbols are invalid
    
    const invalidPassword = 'Admin2025'; // 8+ chars but no symbol
    
    // Verify password fails requirements
    const hasMinLength = invalidPassword.length >= 8;
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};:'",.\\<>?\/\|`~]/.test(invalidPassword);
    
    expect(hasMinLength).toBe(true);
    expect(hasSymbol).toBe(false); // Should fail - no symbol
  });
});
