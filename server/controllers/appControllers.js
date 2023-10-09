import HouseModel from "../models/House.js";

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
    console.log('FROM SERVER', title, price, desc, address, location, houseImageUrl, imageArray)
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
        res.status(400).json({error: 'Unable to save House', statusMsg: 'fail'})
    }
}

export async function getHouses(req, res){
    try {
        const houses =  await HouseModel.find()

        if(!houses || houses.length === 0){
            return res.status(404).json({ error: 'No House Found'})
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
        res.status(500).json({ error: 'Unable to fetch houses', statusMsg: 'fail' });
    }
}

export async function getHouseById(req, res){

}