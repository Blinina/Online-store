const Router = require('express')
const router = new Router()
const controller = require('../controller/basketController')

router.get('/getMyBasket', controller.getAll) 
router.post('/addProduct', controller.addProduct)
router.post('/deleteProduct', controller.deleteProduct)

  

module.exports = router