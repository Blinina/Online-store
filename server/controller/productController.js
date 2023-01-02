const Product = require('../models/Product')

class authController {
    async addProduct(req, res) {
        try {
            const { title } = req.body;
            const candidate = await Product.findOne({ title })
            if (candidate) {
                return res.status(400).json({ message: "Товар  с таким названием уже существует" })
            }
            const newProduct = new Product({ ...req.body })
            console.log(newProduct)
            await newProduct.save()
            res.status(200).json({ message: 'продукт успешно добавлен' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'ошибка' })
        }
    }

    async getCategory(req, res) {
        try {
            let { CategoryId } = req.query;
            let product;
            console.log(CategoryId)
            let number
            if (CategoryId === 'sales') {
                product = await Product.find({ 'sales.sales' : true })
                console.log(product)
            } 
            if (CategoryId === 'newColection') {
                product = await Product.find({ 'newColection' : true })
                console.log(product)
            }
            else {
                product = await Product.find({ 'category': CategoryId })
            }
            return res.json(product)
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'r' })
        }
    }
    async getProduct(req, res) {
        try {
            let { productId } = req.query;
            const product = await Product.findOne({ _id: productId })
            return res.json(product)
        } catch (e) {
            res.status(400).json({ message: 'r' })
        }
    }

}

module.exports = new authController()