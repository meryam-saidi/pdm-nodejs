import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const userSchema = new Schema(
  {
    name: 
    { 
      type: String, 
      //required: true 
    },
    email: 
    { 
      type: String, 
      //required: true, 
      //unique: true 
    },
    password: 
    { 
      type: String, 
      //required: true 
    },
    role: 
    {
      type: String,
      enum: ['donor', 'requestor', 'both'],
      required: true,
    },
    location: 
    { 
      type: Object, 
      //required: true 
    }, // { latitude: Number, longitude: Number }
    phone: 
    { 
      type: String 
    },
    photo: 
    { 
      type: String 
    },
  },
  {
    timestamps: true,
    //discriminatorKey: 'type',
  }
);

export default model('User', userSchema);

