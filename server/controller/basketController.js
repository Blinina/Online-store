const Basket = require('../models/Basket')
const Product = require('../models/Product')

class authController {
    async addProduct(req, res) {
        try {
            const { userId, product } = req.body;
            console.log(product.productId)
            const candidate = await Basket.findOne({ userId })
            if (candidate) {
              await Basket.updateOne(
                    { _id: candidate._id },
                    { $push: { products: product.productId } }
                 )
                 res.status(200).json({ message: 'корзина изменена' })

            }else{
                const newBasket = new Basket({ ...req.body })
                await newBasket.save()
                res.status(200).json({ message: 'продукт успешно добавлен' })
            }  
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'ошибка' })
        }
    }

    async getAll(req, res) {
        try {
            let { _id } = req.query;
            const basket = await Basket.findOne({ userId: _id })
            // const {products} = basket;
            // console.log(products)
            // const productIdArr = products.map(el=>el.productId)
            // const result = await Product.find({ _id: productIdArr});
            return res.json(basket)
        } catch (e) {
            res.status(400).json({ message: 'r' })
        }
    }

}

module.exports = new authController()