const Router = require('express')
const router = new Router()
const controller = require('../productController')

router.post('/product', controller.registration)
router.post('/category', controller.login)
// router.get('/users', controller.getUsers)
  

module.exports = router