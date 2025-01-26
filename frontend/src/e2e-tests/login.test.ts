import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/login');  // Change URL if necessary
  });

  test('Successful login', async ({ page }) => {
    // Ensure the form elements are visible before interacting with them
    await page.waitForSelector('#email');
    await page.waitForSelector('#password');
    
    // Fill in the form
    await page.fill('#email', 'yazan@gmail.com');
    await page.fill('#password', '123456789Y');
    await page.click('button[type="submit"]');

    // Wait for the page to navigate after login (if it does)
    await page.waitForNavigation();

    // Assert successful login, e.g., checking for redirect or welcome message
    await expect(page).toHaveURL(/\/products/); // This will match any URL that ends with "/products"
    await page.waitForTimeout(2000); // Wait to simulate processing time

  });

  test('Login with invalid credentials', async ({ page }) => {
    // Ensure the form elements are visible before interacting with them
    await page.waitForSelector('#email');
    await page.waitForSelector('#password');
    
    // Fill in the form with incorrect credentials
    await page.fill('#email', 'wrong@example.com');
    await page.fill('#password', 'WrongPass');
    await page.click('button[type="submit"]');

    // Wait for the error message to appear
   
     await expect(page.locator('.error-message')).toHaveText('Login failed. Please check your credentials and try again.');
     await page.waitForTimeout(2000); // Wait to simulate processing time

    });

  test('Submit button should be disabled when form is invalid', async ({ page }) => {
    // Check if the submit button is disabled when form is invalid
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', ''); // Invalid password
    const submitButton = await page.locator('button[type="submit"]');
    await expect(submitButton).toBeDisabled();
    await page.waitForTimeout(2000); // Wait to simulate processing time
  
});

  test('Submit button should be enabled when form is valid', async ({ page }) => {
    // Check if the submit button is enabled when form is valid
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'Password123');
    const submitButton = await page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
    await page.waitForTimeout(2000); // Wait to simulate processing time

});
});
