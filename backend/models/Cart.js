// models/Cart.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    email: { type: String, required: true },
    products: [
        {
            id: { type: String, required: true }, // Product ID
            quantity: { type: Number, required: true } // Quantity of the product
        }
    ]
});

module.exports = mongoose.model('Cart', CartSchema);
