import mongoose from "mongoose";

export const HouseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String
    },
    image: {
        type: String
    },
    address: {
        type: String
    },
    location: {
        type: String
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'rilzainUsers'
        }
    ],
    imageArray: {
        type: Array
    },
},
{timestamps: true}
);

const HouseModel =  mongoose.model('rilzainHouse', HouseSchema);
export default HouseModel