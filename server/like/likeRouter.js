const Router = require('express')
const router = new Router()
const controller = require('./likeController')

router.get('/getLike', controller.getWishlist) 
router.post('/addProduct', controller.addProduct)
router.post('/deleteProduct', controller.deleteProduct)

module.exports = router