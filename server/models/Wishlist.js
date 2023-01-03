const { Schema, model } = require('mongoose')

const Wishlist = new Schema(
    {
        userId: { type: String, required: true },
        products: [{ type: String, required: true }],
    },
);

module.exports = model('Wishlist', Wishlist)
