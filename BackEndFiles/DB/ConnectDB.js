import mongoose from'mongoose';

const connectDB = async ()=>{

     mongoose.connect(process.env.DB) 
     .then( result=>{ 
console.log(`connected DB`);
     })
     .catch(err=>{
        console.log(`not connected to DB ${err}`);
     })
     
}

export default connectDB;