const Router = require('express')
const router = new Router()
const productRouter = require('./priductRouter')
const userRouter = require('./userRouter')
// const brandRouter = require('./brandRouter')
// const typeRouter = require('./typeRouter')

router.use('/user', userRouter);
// router.use('/category', typeRouter)
// router.use('/brand', brandRouter)
router.use('/product', productRouter)

module.exports = router