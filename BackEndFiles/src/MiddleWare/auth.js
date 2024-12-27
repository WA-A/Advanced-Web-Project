import jwt from 'jsonwebtoken';
import UserModel from './../Model/User.Model.js';

export const Roles = { // --> array تحتوي من له صلاحية للاستخدام
    Admin:'Admin',
    User:'User'
}

export const auth = (AccessRole = []) =>{

    return async (req,res,next)=>{
        const {authorization} = req.headers;
        
        if(!authorization.startsWith(process.env.BEARERKEY)){ // bearer token the before is named basic token
            //return res.json({message:"Invalid token"});
            return next(new Error (`Invalid token`,401));

        }
        
        
        const token = authorization.split(process.env.BEARERKEY)[1]; // [1] means after Wasan__
        
        const decoded =  jwt.verify(token,process.env.LOGINSIG)
        
        if(!decoded){ 
            return res.status(400).json({message:"Invalid authorization"});
        }
        
        const authUser = await UserModel.findById(decoded.id).select('UserName Role');
        
        if(!authUser){ 
            return res.status(404).json({message:" User Not found"});
        }
        
        if(!AccessRole.includes(authUser.Role)){ // authUser.Role --> صلاحية المستخدم الحالي
            return res.status(403).json({message:" Not auth User"});

        }
        
        req.user=authUser;
             next();
    }
}
 