import { test, expect } from '@playwright/test';

test.describe('Authenticated Product Page Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Simulate user login by setting a token in local storage
    await page.goto('http://localhost:4200/login');

    // Set auth token directly in local storage (simulate login)
    await page.evaluate(() => {
      localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzk1MjYzOTJiOGEyMTFlZDFkZWFmZDQiLCJpYXQiOjE3Mzc4MzE2MzAsImV4cCI6MTczNzgzNTIzMH0.V8tNPGc4cTqsoZOPsnahU3jZYvMMR6Lzco4Musa9D3M'); // Replace with a valid token if needed
    });
    await page.waitForTimeout(3000);

    // Reload the page after setting the token to bypass guards
    await page.goto('http://localhost:4200/products');
    await page.waitForTimeout(3000);

  });

  test('should display products and allow adding to cart', async ({ page }) => {
    // Wait for the product cards to appear
    await page.waitForSelector('.product-card', { state: 'visible', timeout: 10000 });
  
    // Check the number of products displayed
    const productCount = await page.locator('.product-card').count();
    expect(productCount).toBeGreaterThan(0);
  
    // Add the first product to the cart
    await page.locator('.product-card').first().locator('button:has-text("Add to Cart")').click();
  
    // Confirm item is added to the cart
    await page.waitForSelector('.cart-item', { state: 'visible', timeout: 5000 });
    const cartCount = await page.locator('.cart-item').count();
    expect(cartCount).toBeGreaterThan(0);
  });
  

  test('Add product to cart and verify modal successfully', async ({ page }) => {
    const firstProduct = page.locator('.product-card').first();

    // Select a quantity
    await firstProduct.locator('select').selectOption({ index: 0 });

    // Click "Add to Cart" button
    await firstProduct.locator('button', { hasText: 'Add to Cart' }).click();

    // Wait for the success modal to appear
    await page.waitForSelector('#statusModal', { state: 'visible' });
    await page.waitForTimeout(3000);

    // Check if the modal contains a success message
    const modalText = await page.locator('#statusModal .modal-body').innerText();
    expect(modalText).toContain('Product successfully added to cart!');
  });




  test('Add product to cart and verify modal', async ({ page }) => {
    const firstProduct = page.locator('.product-card').first();

    // Select a quantity
    await firstProduct.locator('select').selectOption({ index: 0 });

    // Click "Add to Cart" button
    await firstProduct.locator('button', { hasText: 'Add to Cart' }).click();

    // Wait for the success modal to appear
    await page.waitForSelector('#statusModal', { state: 'visible' });
    await page.waitForTimeout(3000);

    // Check if the modal contains a success message
    const modalText = await page.locator('#statusModal .modal-body').innerText();
    expect(modalText).toContain('Insufficient stock available');
  });

});
