import HouseModel from "../models/House.js";
import RentalModel from "../models/Rental.js";
import SavedHouseModel from "../models/SavedHouse.js";

export async function likeHouse(req, res){
    const { house, user } = req.body

    try {
        const likedHouse = await HouseModel.findById(house)

        if(!likedHouse){
            res.status(404).json({ error: 'House not Found'})
        }

        if(likedHouse.likes.includes(user)){
            likedHouse.likes.pull(user)
        } else{
            likedHouse.likes.push(user)
        }

        await likedHouse.save()
        
        res.status(200).json({ message: 'Like Updated Successfully', statusMsg: 'success'})
    } catch (error) {
        
    }
}

export async function newHouse(req, res){
    const { title, price, desc, address, location, houseImageUrl, imageArray } = req.body
    //console.log('FROM SERVER', title, price, desc, address, location, houseImageUrl, imageArray)
    try {
        const newHouse = new HouseModel({
            title,
            price,
            desc,
            image: houseImageUrl,
            address,
            location,
            imageArray
        })

        const savedHouse = await newHouse.save()
        console.log('HOUSED SAVED')
        res.status(201).json({
                                statusMsg: 'success',
                                data: {
                                    house: savedHouse
                                }
                            })
    } catch (error) {
        console.log('Failed to upload to DB>>', error)
        res.status(500).json({data: 'Unable to save House', statusMsg: 'fail'})
    }
}

export async function getHouses(req, res){
    
    try {
        
        const houses =  await HouseModel.find()

        if(!houses || houses.length === 0){
            return res.status(404).json({ statusMsg: 'fail', data: 'No House Found'})
        }

        res.status(200).json({
            statusMsg: 'success',
            data: {
                houses
            }
        })
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error fetching houses:', error);
        res.status(500).json({ data: 'Unable to fetch houses', statusMsg: 'fail' });
    }
}

export async function getHouseById(req, res) {
    const id = req.params.id;
    try {
        const house = await HouseModel.findById({ _id: id });

        if (!house) {
            return res.status(404).json({ error: 'No House Matching Found' });
        }

        res.status(200).json({ statusMsg: 'success', data: { house } });
    } catch (error) {
        console.error('Error Getting House', error);
        res.status(500).json({ error: 'Could not get house with this id', statusMsg: 'fail' });
    }
}

export async function favHouse(req, res) {
    
    const { user, house } = req.body;
    try {
        const newFavHouse = new SavedHouseModel({ userId: user, houseId: house });
        const saveNewFavHouse = await newFavHouse.save();

        console.log('HOUSE ADDED TO FAVOURITE');
        res.status(201).json({ statusMsg: 'success', data: { saveNewFavHouse } });
    } catch (error) {
        console.error('Error adding House to favorite:', error);
        res.status(500).json({ error: 'Could not add house to favorites', statusMsg: 'fail' });
    }
}

export async function getMyHouse(req, res){
    const id = req.params.id
    console.log(id)
    try {
        const userHouse = await SavedHouseModel.find({ userId: id })

        if(!userHouse){
            res.status(404).json({ statusMsg: 'fail', error: 'No Favourites or Saved found'})
        }

        const houseIds = userHouse.map((savedHouse) => savedHouse.houseId);

        const saveHouseData = await HouseModel.find({ _id:  { $in: houseIds }})

        res.status(200).json({ statusMsg: 'success', data: {saveHouseData}})
    } catch (error) {
        console.log('Cannot get User Saved House', error)
        res.status(500).json({ statusMsg: 'fail', error: 'Failed to get user House'})
    }
}

export async function deleteHouse(req, res){
    const { houseId, admin } = req.query
    console.log(admin)
    console.log(houseId)
    console.log('RECIEVED')
    try {
        if(!admin){
            return res.status(404).json({statusMsg: 'fail', error: 'NOT ALLOWED'})
        } else{
            const deletedHouse = await HouseModel.findByIdAndDelete(houseId)
            
            if(deletedHouse){
                return res.status(200).json({ statusMsg: 'success', message: 'House Deleted successfully'})
            } else{
                return res.status(400).json({ statusMsg: 'fail', error: 'Failed to Delete House'})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ statusMsg: 'fail', error: 'Failed to Delete House'})
    }
}

export async function updateHouse(req, res){
    //const id = req.params.id
    const {id, title, price, desc, address, location, houseImageUrl, imageArray} = req.body
    console.log(id)
    try {
        const existingHouse = await HouseModel.findById({ _id: id})

        if(!existingHouse){
            return res.status(404).json({ statusMsg: 'fail', data: 'House Not Found'})
        }

        if(title) existingHouse.title = title
        if(price) existingHouse.price = price
        if(desc) existingHouse.desc = desc
        if(address) existingHouse.address = address
        if(location) existingHouse.location = location
        if(houseImageUrl) existingHouse.houseImageUrl = houseImageUrl
        if(imageArray) existingHouse.imageArray = imageArray

        //save the house
        await existingHouse.save()
        console.log('HOUSE UPDATED')
        res.status(200).json({ statusMsg: 'success', data: 'House updated successfully'})
    } catch (error) {
        console.log('ERROR UPDATING HOUSE', error)
        res.status(500).json({ statusMsg: 'fail', data: 'ERROR UPDATING HOUSE' })
    }
}

/**RENTALS HOMES API */
export async function newRental(req, res){
    const { title, price, desc, address, location, houseImageUrl, imageArray } = req.body
    //console.log('FROM SERVER', title, price, desc, address, location, houseImageUrl, imageArray)
    try {
        const newHouse = new RentalModel({
            title,
            price,
            desc,
            image: houseImageUrl,
            address,
            location,
            imageArray
        })

        const savedHouse = await newHouse.save()
        console.log('RENTAL SAVED')
        res.status(201).json({
                                statusMsg: 'success',
                                data: {
                                    house: savedHouse
                                }
                            })
    } catch (error) {
        console.log('Failed to upload to DB>>', error)
        res.status(500).json({data: 'Unable to save House', statusMsg: 'fail'})
    }
}
export async function getRental(req, res){
    
    try {
        
        const rental =  await RentalModel.find()

        if(!rental || rental.length === 0){
            return res.status(404).json({ statusMsg: 'fail', data: 'No House Found'})
        }

        res.status(200).json({
            statusMsg: 'success',
            data: {
                rental
            }
        })
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error('Error fetching rental property:', error);
        res.status(500).json({ data: 'Unable to fetch Rentals', statusMsg: 'fail' });
    }
}

export async function getRentalById(req, res) {
    const id = req.params.id;
    try {
        const rental = await RentalModel.findById({ _id: id });

        if (!rental) {
            return res.status(404).json({ error: 'No Rental Matching Found' });
        }

        res.status(200).json({ statusMsg: 'success', data: { rental } });
    } catch (error) {
        console.error('Error Getting Rental', error);
        res.status(500).json({ data: 'Could not get rental with this id', statusMsg: 'fail' });
    }
}

export async function updateRental(req, res){
    //const id = req.params.id
    const {id, title, price, desc, address, location, houseImageUrl, imageArray} = req.body
    console.log(id)
    try {
        const existingRental = await RentalModel.findById({ _id: id})

        if(!existingRental){
            return res.status(404).json({ statusMsg: 'fail', data: 'Rental Not Found'})
        }

        if(title) existingRental.title = title
        if(price) existingRental.price = price
        if(desc) existingRental.desc = desc
        if(address) existingRental.address = address
        if(location) existingRental.location = location
        if(houseImageUrl) existingRental.houseImageUrl = houseImageUrl
        if(imageArray) existingRental.imageArray = imageArray

        //save the house
        await existingRental.save()
        console.log('RENTAL UPDATED')
        res.status(200).json({ statusMsg: 'success', data: 'Rental updated successfully'})
    } catch (error) {
        console.log('ERROR UPDATING RENTAL', error)
        res.status(500).json({ statusMsg: 'fail', data: 'ERROR UPDATING RENTAL' })
    }
}