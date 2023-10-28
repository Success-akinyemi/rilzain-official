import { Router } from "express"
import * as controller from '../controllers/auth.js'
import Protect from "../middleware/auth.js"

const router = Router()

//POST ROUTES
router.route('/register').post(controller.register)
router.route('/login').post(controller.login)
router.route('/forgotPassword').post(controller.forgotPassword)
router.route('/user/makeAdmin').post(Protect, controller.makeAdmin)
router.route('/user/removeAdmin').post(Protect, controller.removeAdmin)


//GET ROUTES
router.route('/user/:id').get(controller.getUser)
router.route('/getUsers/:id').get(controller.getAllUser)


//PUT ROUTES
router.route('/resetPassword/:resetToken').put(controller.resetPassword)





export default router