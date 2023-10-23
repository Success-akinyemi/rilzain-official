import mongoose from "mongoose";

export const RentalSchema = new mongoose.Schema({
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

const RentalModel =  mongoose.model('rilzainRental', RentalSchema);
export default RentalModel