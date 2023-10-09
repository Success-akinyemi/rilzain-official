import mongoose from "mongoose";

const SavedHouseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rilzainUsers',
    },
    houseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'rilzainHouses',
    },
})

// Define a pre-remove middleware function
SavedHouseSchema.pre('remove', async function (next) {
    const houseId = this.houseId;
  
    try {
      // Remove all references to this house from SavedHouse documents
      await this.model('SavedHouse').deleteMany({ houseId });
      next();
    } catch (error) {
      next(error);
    }
  });

const SavedHouseModel = mongoose.model('SavedHouse', SavedHouseSchema)
export default SavedHouseModel