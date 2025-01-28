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
    // Add item first
    await page.locator('.product-card button').first().click();
    await page.goto('http://localhost:4200/my-cart');
    
    // Remove item
    const initialCount = await page.locator('.cart-item').count();
    await page.locator('.remove-button').first().click();
    
    // Verify removal
    await expect(page.locator('.cart-item')).toHaveCount(0);
    
    // Verify summary update
    if (initialCount === 1) {
      await expect(page.locator('.empty-state')).toBeVisible();
    } else {
      await expect(page.locator('.items-count')).toContainText(`0 items`);
    }
  });

  test('should show empty cart message when no items are present', async ({ page }) => {
    await page.goto('http://localhost:4200/my-cart');
    
    // Verify empty state components
    await expect(page.locator('.empty-state')).toBeVisible();
    await expect(page.locator('.empty-state h3')).toContainText('Your Cart is Empty');
    await expect(page.locator('.empty-state p')).toContainText('Looks like you haven\'t added any items yet');
    await expect(page.locator('.continue-shopping')).toBeVisible();
  });
});