const Router = require('express')
const router = new Router()
const productRouter = require('./product/productRouter');
const basketRouter = require('./basket/basketRouter');
const authRouter = require('./user/userRouter');
const wishlistRouter = require('./like/likeRouter');

router.use('/user', authRouter)
router.use('/', productRouter)
router.use('/basket', basketRouter)
router.use('/like', wishlistRouter)

module.exports = router