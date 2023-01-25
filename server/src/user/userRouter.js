const Router = require("express")
const router = new Router()
const controller = require("./userController")

router.post("/registration", controller.registration)
router.post("/login", controller.login)
router.post("/updateUser", controller.updateUser)

module.exports = router
