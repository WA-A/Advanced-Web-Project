
import mongoose, { Schema, model } from 'mongoose';

const GallarySchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, 
{ 
timestamps: true 

}
);



const GallaryModel = model('Gallary',GallarySchema); 
export default GallaryModel;
