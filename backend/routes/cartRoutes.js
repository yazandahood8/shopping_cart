const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;  // Correctly import ObjectId

router.post('/addToCart', async (req, res) => {
    const { email, id, quantity } = req.body;
    console.log('Request received to add product to cart:', req.body);  // Log the request body

    try {
        // Convert the id to ObjectId if it's a string, but logging it first
        const productId = id;
        console.log('Product ID from request:', productId);  // Log the product id

        // Find the product using the custom 'id' field
        console.log('Querying product with id:', productId);
        const product = await Product.findById(productId);
        console.log('Product found:', product);  // Log the product found or not

        if (!product) {
            console.log('Product not found with id:', productId);  // Log when product is not found
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if requested quantity is available in stock
        if (product.quantity < quantity) {
            console.log('Insufficient stock for product:', productId);  // Log insufficient stock
            return res.status(400).json({ message: 'Insufficient stock available' });
        }

        // Update product quantity in the Product collection
        console.log('Updating product quantity. Current stock:', product.quantity);  // Log current stock
        product.quantity -= Number(quantity);  // Ensures quantity is treated as a number
        await product.save();
        console.log('Product stock updated. New stock:', product.quantity);  // Log updated stock

        // Look for the user's cart
        let cart = await Cart.findOne({ email });
        console.log('Cart found:', cart);  // Log the found cart

        // If no cart exists for the user, create a new one
        if (!cart) {
            console.log('No cart found, creating a new one for user:', email);  // Log cart creation
            cart = new Cart({ email, products: [{ id: productId, quantity }] });
        } else {
            // If the cart exists, check if the product is already in the cart
            const productIndex = cart.products.findIndex(item => item.id.toString() === productId.toString());
            if (productIndex !== -1) {
                // If the product exists, update the quantity in the cart
                console.log('Product already in cart. Updating quantity...');
                cart.products[productIndex].quantity += Number(quantity);
            } else {
                // If the product doesn't exist in the cart, add a new product
                console.log('Product not in cart. Adding to cart...');
                cart.products.push({ id: productId, quantity });
            }
        }

        // Save the cart with the updated product or newly added product
        console.log('Saving updated cart...');
        await cart.save();

        // Return a response with the updated cart and success message
        console.log('Product successfully added to cart. Returning response...');
        res.status(201).json({ message: 'Product added to cart successfully', cart });
    } catch (error) {
        console.error('Error adding product to cart:', error);  // Log the error
        res.status(500).json({ message: 'Error adding product to cart', error });
    }
});





router.post('/removeFromCart', async (req, res) => {
    const { email, productId } = req.body;

    try {
        const cart = await Cart.findOne({ email });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(item => item.id.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Retrieve product quantity before removing from cart
        const removedProduct = cart.products[productIndex];
        const { quantity } = removedProduct;

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);
        await cart.save();

        // Update the product quantity in the Product collection
        const product = await Product.findById(new ObjectId(productId));
        if (product) {
            product.quantity += Number(quantity);  // Restore the removed quantity to stock
            await product.save();
        }

        res.status(200).json({ message: 'Product removed from cart successfully', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing product from cart', error });
    }
});

module.exports = router;


// Update product quantity in cart
router.put('/updateQuantity', async (req, res) => {
    const { email, productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ email });

        if (!cart) {
            return res.status(400).json({ message: 'Cart not found' });
        }

        // Find the product in the cart and update its quantity
        const productIndex = cart.products.findIndex(item => item.id.toString() === productId);
        if (productIndex !== -1) {
            // Update the quantity in the cart
            const product = cart.products[productIndex];
            
            // Check if the requested quantity is available in stock
            const productDetails = await Product.findById(productId);
            if (productDetails.quantity < quantity) {
                return res.status(400).json({ message: 'Insufficient stock available' });
            }

            // Update the quantity in the cart and product table
            product.quantity = quantity;

            // Save the updated cart
            await cart.save();
            res.status(200).json({ message: 'Quantity updated successfully', cart });
        } else {
            res.status(400).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating quantity', error });
    }
});

router.get('/myCart/:email', async (req, res) => {
    const { email } = req.params;

    try {
        // Find the user's cart by email
        const cart = await Cart.findOne({ email });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Populate product details for each product in the cart
        const populatedCart = await Cart.findOne({ email }).populate({
            path: 'products.id',  // Assuming product id is stored under "id"
            model: 'Product',
            select: 'name price image',  // Fetch only required product details
        });

        res.status(200).json({
            email: populatedCart.email,
            products: populatedCart.products.map(item => ({
                _id: item.id._id,
                name: item.id.name,
                price: item.id.price,
                image: item.id.image,
                quantity: item.quantity,  // Cart quantity
            })),
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;