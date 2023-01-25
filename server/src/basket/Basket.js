const { Schema, model } = require("mongoose")

const Basket = new Schema({
  userId: { type: String, required: true },
  products: [
    {
      product: {
        type: Object,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
})

module.exports = model("Basket", Basket)
