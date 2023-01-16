const Router = require('express')
const router = new Router()
const controller = require('./productController')

router.get('/category', controller.getCategory)
router.get('/:id', controller.getProduct)
router.post('/addProduct', controller.addProduct)

module.exports = router