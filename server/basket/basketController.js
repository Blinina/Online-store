const Basket = require('./Basket');

class authController {
    async addProduct(req, res) {
        try {
            const { userId, product } = req.body;
            const basket = await Basket.findOne({ userId })
            if (basket) {
                const copy = await Basket.findOne({ _id: basket._id, products: { "$elemMatch": { "product": product.product } } })
                if (copy) {
                    await Basket.updateOne(
                        { _id: basket._id },
                        { $pull: { products: { product: product.product } } },
                    )
                    await Basket.updateOne(
                        { _id: basket._id },
                        { $push: { products: product } }
                    )
                    res.status(200).json({ message: 'продукт в карзине обновлен' })
                } else {
                    await Basket.updateOne(
                        { _id: basket._id },
                        { $push: { products: product } }
                    )
                    res.status(200).json({ message: 'корзина изменена' })
                }
            } else {
                const newBasket = new Basket({ userId: userId, products: product })
                await newBasket.save()
                res.status(200).json({ message: 'корзина создана' })
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'ошибка' })
        }
    }
    async deleteProduct(req, res) {
        try {
            const { userId, product } = req.body;
            const candidate = await Basket.findOne({ userId })
            await Basket.updateOne(
                { _id: candidate._id },
                { $pull: { products: { product: product } } }
            )
            res.status(200).json({ message: 'элемент удален' })
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(req, res) {
        try {
            let { payload } = req.query;
            const basket = await Basket.findOne({ userId: payload })
            if(basket){
                return res.json(basket.products)
            }else{
                const newBasket = new Basket({ userId: payload})
                await newBasket.save()
               return res.json([])
            }
        } catch (e) {
            res.status(400).json({ message: 'r' })
        }
    }

}

module.exports = new authController()