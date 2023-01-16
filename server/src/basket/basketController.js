const Basket = require("./Basket");

class authController {
    async addProduct(req, res) {
        try {
            const { userId, product } = req.body;
            const isBasketExist = await Basket.findOne({ userId });
            if (isBasketExist) {
                const isProductExist = await Basket.findOne({
                    _id: basket._id,
                    products: { $elemMatch: { product: product.product } },
                });
                if (isProductExist) {
                    await Basket.updateOne(
                        { _id: isBasketExist._id },
                        { $pull: { products: { product: product.product } } }
                    );
                    await Basket.updateOne(
                        { _id: isBasketExist._id },
                        { $push: { products: product } }
                    );
                    res.status(200).json({ message: "продукт в корзине обновлен" });
                } else {
                    await Basket.updateOne(
                        { _id: isBasketExist._id },
                        { $push: { products: product } }
                    );
                    res.status(200).json({ message: "корзина изменена" });
                }
            } else {
                const newBasket = new Basket({ userId: userId, products: product });
                await newBasket.save();
                res.status(200).json({ message: "корзина создана" });
            }
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "ошибка" });
        }
    }
    async deleteProduct(req, res) {
        try {
            const { userId, product } = req.body;
            const targetBasket = await Basket.findOne({ userId });
            await Basket.updateOne(
                { _id: targetBasket._id },
                { $pull: { products: { product: product } } }
            );
            res.status(200).json({ message: "элемент удален" });
        } catch (e) {
            console.log(e);
        }
    }

    async getAll(req, res) {
        try {
            let { payload } = req.query;
            const isBsaketExist = await Basket.findOne({ userId: payload });
            if (isBsaketExist) {
                return res.json(isBsaketExist.products);
            } else {
                const newBasket = new Basket({ userId: payload });
                await newBasket.save();
                return res.json([]);
            }
        } catch (e) {
            res.status(400).json({ message: "getAll error" });
        }
    }
}

module.exports = new authController();
