const { Schema, model } = require("mongoose")

const Product = new Schema({
  title: { type: String, unique: true },
  price: { type: Number },
  description: { type: String },
  category: { type: String },
  type: { type: String },
  image: [{ type: String }],
  rating: { type: Number },
  newColection: { type: Boolean },
  sales: {
    sales: { type: Boolean },
    count: { type: Number },
  },
})

module.exports = model("Product", Product)
