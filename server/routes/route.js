import { Router } from "express"
import * as controllers from '../controllers/appControllers.js'
import Protect from "../middleware/auth.js"


const privateRouter = Router()

//POST ROUTES
privateRouter.route('/house/newHouse').post(Protect, controllers.newHouse);
privateRouter.route('/house/like').post(controllers.likeHouse);
privateRouter.route('/house/addToFav').post(controllers.favHouse);

//GET ROUTES
privateRouter.route('/house/getHouse').get(controllers.getHouses)
privateRouter.route('/house/getHouse/:id').get(controllers.getHouseById)
privateRouter.route('/house/getMyhouse/:id').get(controllers.getMyHouse) //add protect


export default privateRouter