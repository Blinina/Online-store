const Router = require('express')
const router = new Router()
const productRouter = require('./productRouter')
const basketRouter = require('./basketRouter')
const authRouter = require('./authRouter')

router.use('/auth', authRouter)
router.use('/', productRouter)
router.use('/basket', basketRouter)


module.exports = router