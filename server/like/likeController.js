const Wishlist = require('./LikeModel');
const Product = require('../product/Product');

class authController {
    async addProduct(req, res) {
        try {
            const { userId, product } = req.body;
            const candidate = await Wishlist.findOne({ userId })
            if (candidate) {
                await Wishlist.updateOne(
                    { _id: candidate._id },
                    { $push: { products: product } }
                )
                res.status(200).json({ message: 'вишлист пополнен' })
            } else {
                const newWishlist = new Wishlist({ userId: userId, products: product })
                await newWishlist.save()
                res.status(200).json({ message: 'вишлист создан' })
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'addProduct error' })
        }
    }

    async deleteProduct(req, res) {
        try {
            const { userId, product } = req.body;
            const candidate = await Wishlist.findOne({ userId })
            await Wishlist.updateOne(
                { _id: candidate._id },
                { $pull: { products: product } }
            )
            res.status(200).json({ message: 'элемент удален' })
        } catch (e) {
            res.status(400).json({ message: 'deleteProduct error' })
        }
    }
    async getWishlist(req, res) {
        try {
            let { payload } = req.query;
            const products = await Wishlist.findOne({ userId: payload });
            if (products) {
                const result = await Product.find({ _id: products.products });
                return res.json(result)
            } else {
                const newWishlist = new Wishlist({ userId: payload })
                await newWishlist.save()
                return res.json([]);
            }
        } catch (e) {
            res.status(400).json({ message: 'getWishlist error' })
        }
    }

}

module.exports = new authController()