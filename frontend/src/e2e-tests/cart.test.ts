import { test, expect } from '@playwright/test';

test.describe('Cart Functionality Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Simulate user login by setting a token in local storage
    await page.goto('http://localhost:4200/login');

    // Set auth token directly in local storage (simulate login)
    await page.evaluate(() => {
        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzk1MjYzOTJiOGEyMTFlZDFkZWFmZDQiLCJpYXQiOjE3Mzc4MzE2MzAsImV4cCI6MTczNzgzNTIzMH0.V8tNPGc4cTqsoZOPsnahU3jZYvMMR6Lzco4Musa9D3M'); // Replace with a valid token if needed
    });

    // Navigate to the product page after login
    await page.goto('http://localhost:4200/products');

  });

  test('should display products and allow adding to cart', async ({ page }) => {
    // Navigate to the products page
    await page.goto('http://localhost:4200/products');
    await page.waitForTimeout(2000); // Wait to simulate processing time


    // Wait for at least one product card to appear before proceeding
    await page.waitForSelector('.product-card', { state: 'visible', timeout: 5000 });
    
    // Get product count after ensuring they are visible
    const productCount = await page.locator('.product-card').count();
    expect(productCount).toBeGreaterThan(0);

    // Click the 'Add to Cart' button for the first product
    await page.locator('.product-card button:has-text("Add to Cart")').first().click();
    
    // Wait to ensure the product is added to the cart
    await page.waitForTimeout(2000); // Wait to simulate processing time

    // Navigate to the cart page
    await page.goto('http://localhost:4200/my-cart');

    // Wait for cart items to be visible
    await page.waitForSelector('.cart-item', { state: 'visible', timeout: 5000 });

    // Verify that the product was added to the cart
    const cartCount = await page.locator('.cart-item').count();
    expect(cartCount).toBeGreaterThan(0);
    await page.waitForTimeout(2000); // Wait to simulate processing time

});


  test('should remove product from cart', async ({ page }) => {
    // Go to cart page
    await page.goto('http://localhost:4200/my-cart');
    await page.waitForTimeout(2000); // Wait to simulate processing time

    // Remove the first product from the cart
    await page.locator('.cart-item button:has-text("Remove")').first().click();

    // Verify product was removed by checking the updated cart item count
    await page.waitForTimeout(2000); // Allow time for the UI update
    const updatedCartCount = await page.locator('.cart-item').count();
    expect(updatedCartCount).toBeLessThan(1);
    await page.waitForTimeout(2000); // Wait to simulate processing time

  });

  test('should show empty cart message when no items are present', async ({ page }) => {
    // Go to cart page
    await page.waitForTimeout(2000); // Wait to simulate processing time

    await page.goto('http://localhost:4200/my-cart');

    // Check for empty cart message visibility
    await expect(page.locator('p:has-text("Your cart is empty.")')).toBeVisible();
    await page.waitForTimeout(2000); // Wait to simulate processing time

  });
});
