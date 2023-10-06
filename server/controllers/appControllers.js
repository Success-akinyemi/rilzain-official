import HouseModel from "../models/House.js";

export async function likeHouse(req, res){
    const houseId = req.params.houseId;

    try {
        const house = await HouseModel.findById(houseId)

        if(!house){
            res.status(404).json({ error: 'House not Found'})
        }

        if(house.likes.includes(req.user._id)){
            house.likes.pull(req.user._id)
        } else{
            house.likes.push(req.user._id)
        }

        await house.save()
        
        res.status(200).json({ message: 'Like Updated Successfully', status: 'success'})
    } catch (error) {
        
    }
}

export async function newHouse(req, res){
    const { title, price, desc, address, location, houseImage, imageArray } = req.body

    try {
        const newHouse = new HouseModel({
            title,
            price,
            desc,
            image: houseImage,
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