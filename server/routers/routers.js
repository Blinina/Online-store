const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const authRouter = require('./authRouter')

router.use('/auth', authRouter)
router.use('/product', productRouter)

module.exports = router