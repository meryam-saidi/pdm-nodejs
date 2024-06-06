import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const surplusFoodSchema = new Schema(
  {
    donorId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        //required: true 
    },
    foodType: 
    { 
        type: String, 
        //required: true 
    },
    quantity: 
    { 
        type: Number, 
        //required: true 
    },
    expirationDate: 
    { 
        type: Date, 
        //required: true 
    },
    description: 
    { 
        type: String 
    },
    photos: 
    [ { 
        type: String 
    } ],   
  },
  { timestamps: true }
);

export default model('SurplusFood', surplusFoodSchema);

