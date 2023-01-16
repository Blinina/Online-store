const Product = require('./Product')

class authController {
    async addProduct(req, res) {
        try {
            const { title } = req.body;
            const isProductExist = await Product.findOne({ title })
            if (isProductExist) {
                return res.status(400).json({ message: "Товар  с таким названием уже существует" })
            }
            const newProduct = new Product({ ...req.body })
            await newProduct.save()
            res.status(200).json({ message: 'продукт успешно добавлен' })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'ошибка' })
        }
    }

    async getCategory(req, res) {
        try {
            const { CategoryId } = req.query;
            let product; 
            if (CategoryId === 'sales') {
                product = await Product.find({ 'sales.sales': true })
            } else if (CategoryId === 'newColection') {
                product = await Product.find({ 'newColection': true })
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
            const product = await Product.findOne({ _id: req.query.productId })
            return res.json(product)
        } catch (e) {
            res.status(400).json({ message: 'r' })
        }
    }
}

module.exports = new authController()