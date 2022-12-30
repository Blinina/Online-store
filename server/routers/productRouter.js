const Router = require('express')
const router = new Router()
const controller = require('../controller/productController')

router.get('/product', controller.getProduct) //один продукт
// router.get('/category', controller.login)
router.post('/addProduct', controller.addProduct)

  

module.exports = router