import { Router } from "express"
import * as controllers from '../controllers/appControllers.js'
import Protect from "../middleware/auth.js"


const privateRouter = Router()

//POST ROUTES
privateRouter.route('/house/newHouse').post(Protect, controllers.newHouse);
privateRouter.route('/house/like').post(controllers.likeHouse);
privateRouter.route('/house/addToFav').post(controllers.favHouse);
privateRouter.route('/rental/newRental').post(controllers.newRental)

//GET ROUTES
privateRouter.route('/house/getHouse').get(controllers.getHouses)
privateRouter.route('/house/getHouse/:id').get(controllers.getHouseById)
privateRouter.route('/house/getMyhouse/:id').get(controllers.getMyHouse) //add protect
privateRouter.route('/rental/getRental').get(controllers.getRental)
privateRouter.route('/rental/getRental/:id').get(controllers.getRentalById)


//PUT ROUTES
privateRouter.route('/house/update').put(Protect, controllers.updateHouse)
privateRouter.route('/rental/update').put(Protect, controllers.updateRental)

//DELETE ROUTES
privateRouter.route('/house/delete').delete(Protect, controllers.deleteHouse)
privateRouter.route('/house/deleteSavedHouse').delete( controllers.deleteSavedHouse)

export default privateRouter