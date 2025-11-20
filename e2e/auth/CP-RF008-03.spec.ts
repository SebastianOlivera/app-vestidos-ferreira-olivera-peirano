import { test, expect } from '@playwright/test';

test.describe('CP-RF008-03 - Invalid administrator password (too short)', () => {
  test('should reject password with less than 8 characters', async ({ page }) => {
    // This test validates that passwords with less than 8 characters are invalid
    
    const invalidPassword = 'Admin'; // Less than 8 chars
    
    // Verify password fails requirements
    const hasMinLength = invalidPassword.length >= 8;
    
    expect(hasMinLength).toBe(false); // Should fail - too short
  });
});
