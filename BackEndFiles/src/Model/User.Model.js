import mongoose, { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    UserName:{
      type: String,
       required:true,
    },
    Email:{
        type:String,
        unique:true
     },
     Password:{
      type:String,
      required:true
   },
     Role:{
        type:String,
        default:'User',
        enum:['User','Admin'],
     },
     IsDeleted:{     
      type:Boolean,
      default:false,
      },
      Role: {
         type: String,
         default: 'User',
         enum: ['User', 'Admin'],
     },
    },
    {
     timestamps:true,
    }  
);
 

const UserModel = model('User',UserSchema); 
export default UserModel;