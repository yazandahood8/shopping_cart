import { test, expect } from '@playwright/test';

test('Test 1: Should show error when email already exists', async ({ page }) => {
  // Navigate to the SignUp page
  await page.goto('http://localhost:4200/signup');
  
  // Simulate an email that already exists
  await page.fill('input#name', 'John Doe');
  await page.fill('input#email', 'yazan@gmail.com'); // Assuming this email exists
  await page.fill('input#password', 'Password123');
  await page.fill('input#repassword', 'Password123');

  const submitButton = page.locator('button[type="submit"]');
  await submitButton.waitFor({ state: 'visible', timeout: 60000 });

  // Check if the submit button is enabled
  await expect(submitButton).toBeEnabled();

  await submitButton.click();
  await page.waitForTimeout(3000);

  // Check if the error message appears
  await page.waitForSelector('.error-message', { state: 'visible' });
  const emailError = page.locator('.error-message');
  await expect(emailError).toContainText('Email already exists');
});

test('Test 2: Should show password validation errors', async ({ page }) => {
  // Navigate to the SignUp page
  await page.goto('http://localhost:4200/signup');
  
  // Test invalid password (too short and no uppercase)
  await page.fill('input#name', 'John Doe');

  await page.fill('input#email', 'new.email@example.com');
  await page.fill('input#password', 'pass'); // Password too short, no uppercase
  await page.fill('input#repassword', 'pass');

  const submitButton = page.locator('button[type="submit"]');

  // Check if submit button is disabled
  await expect(submitButton).toBeDisabled();
  await page.waitForTimeout(3000);

});

test('Test 3: Should show error for mismatched passwords', async ({ page }) => {
  // Navigate to the SignUp page
  await page.goto('http://localhost:4200/signup');
  
  // Test mismatched passwords
  await page.fill('input#name', 'John Doe');
  await page.fill('input#email', 'john.doe@example.com');
  await page.fill('input#password', 'Password123');
  await page.fill('input#repassword', 'DifferentPassword');

  const submitButton = page.locator('button[type="submit"]');
  await expect(submitButton).toBeDisabled();
  await page.waitForTimeout(3000);

});

test('Test 4: Should allow valid registration', async ({ page }) => {
  // Navigate to the SignUp page
  await page.goto('http://localhost:4200/signup');
  
  // Test valid registration
  await page.fill('input#name', 'John Doe');
  await page.fill('input#email', 'john.doe@example.com');
  await page.fill('input#password', 'Password123');
  await page.fill('input#repassword', 'Password123');

  const submitButton = page.locator('button[type="submit"]');
  await submitButton.waitFor({ state: 'visible', timeout: 60000 });

  // Check if submit button is enabled
  await expect(submitButton).toBeEnabled();

  await submitButton.click();
  await page.waitForTimeout(3000);

  
});
