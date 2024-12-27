import connectDB from '../DB/ConnectDB.js';

import cors from 'cors';


const Appinit = (app,express)=>{
    app.use(express.json());
    app.use(cors())
    connectDB();
   
    app.use('*',(req,res)=>{
        return res.status(404).json({message:"Page not Found"});
    });

    app.use( (err,req,res,next)=>{ 
     res.json({message:err.message});
    });
 
}
export default Appinit ;