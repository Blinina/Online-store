const Router = require('express')
const router = new Router()
const productRouter = require('./src/product/productRouter');
const basketRouter = require('./src/basket/basketRouter');
const authRouter = require('./src/user/userRouter');
const wishlistRouter = require('./src/like/likeRouter');

router.use('/user', authRouter)
router.use('/', productRouter)
router.use('/basket', basketRouter)
router.use('/like', wishlistRouter)

module.exports = router