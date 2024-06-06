import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const collectionSchema = new Schema(
  {
    surplusFoodId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'SurplusFood', 
        required: true 
    },
    requestorId: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    collectionDate: 
    { 
        type: Date, 
        //required: true 
    },
    collectionTime: 
    { 
        type: String, 
        //required: true 
    },
    status: 
    { 
        type: String, 
        enum: ['pending', 'confirmed', 'canceled', 'completed'], 
        //required: true 
    },
    comments: 
    { 
        type: String 
    },  
  },
  { timestamps: true }
);

export default model('Collection', collectionSchema);

