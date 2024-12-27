import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';
import { customAlphabet, nanoid } from 'nanoid';
import UserModel from '../../Model/User.Model.js';



export const SignUp = async (req,res)=>{
   
   
    const {UserName,Email,Password} = req.body;

    const HashedPassword = bcrypt.hashSync(Password,parseInt(process.env.SALTROUND));
     
    const CreateUser = await UserModel.create({UserName,Email,Password:HashedPassword});
    const decoded = jwt.sign({ Email },process.env.CONFIRM_EMAILTOKEN);
    return res.status(201).json({message:" success",user:CreateUser});

}






    
  