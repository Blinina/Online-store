const Product = require('../models/Product')

// const { validationResult } = require('express-validator')
const {secret} = require("../config")



class authController {
    async addProduct(req, res) {
        try {
            const {title} = req.body;
            const candidate = await Product.findOne({title})
            if (candidate) {
                return res.status(400).json({message: "Товар  с таким названием уже существует"})
            }
            const newProduct = new Product({ ...req.body })
            console.log(newProduct)
            await newProduct.save()
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'продукт успешно добавлен'})
        }
    }

    async getProduct(req, res) {
        try {
          const product = new Role()
        

            // await userRole.save()
            // await sallerRole.save()
            // res.json('server user')
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'r'})
        }
    }
}

module.exports = new authController()