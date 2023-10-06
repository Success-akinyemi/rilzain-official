import { Router } from "express"
import * as controllers from '../controllers/appControllers.js'
import Protect from "../middleware/auth.js"


const privateRouter = Router()

//POST ROUTES
privateRouter.route('/house/newHouse').post(Protect, controllers.newHouse)
privateRouter.route('/house/like').post(controllers.likeHouse)

//GET ROUTES
privateRouter.route('/house/getHouse').get(controllers.getHouses)
export default privateRouter