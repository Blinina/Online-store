const Wishlist = require('../models/Wishlist')
const Product = require('../models/Product')
class authController {
    async addProduct(req, res) {
        try {
            const { userId, product } = req.body;
            console.log(req.body)
            const candidate = await Wishlist.findOne({ userId })
            if (candidate) {
              await Wishlist.updateOne(
                    { _id: candidate._id },
                    { $push: { products: product } }
                 )
                 res.status(200).json({ message: 'вишлист пополнен' })

            }else{
                const newWishlist = new Wishlist({ ...req.body })
                await newWishlist.save()
                res.status(200).json({ message: 'вишлист создан' })
            }  
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'ошибка' })
        }
    }

    async getWishlist(req, res) {
        try {
            const products = await Wishlist.findOne({ userId: req.query._id });           
            const result = await Product.find({ _id: products.products});
            return res.json(result)
        } catch (e) {
            res.status(400).json({ message: 'r' })
        }
    }

}

module.exports = new authController()