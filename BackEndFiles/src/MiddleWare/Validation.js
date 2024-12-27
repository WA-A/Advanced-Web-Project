
export const Validation = (schema)=>{
    const errorsMessage = [];
   return (req,res,next)=>{
    
    if(req.file){
        fileData.image = req.file
    }
    
    const {error}={...req.body,...req.params,...req.query};

    
    if(error){
        error.details.forEach( err=>{
            const key = err.context.key;
            errorsMessage.push({[key]:err.massege});
        })
     return res.status(400).json({message:"validate error",errors:errorsMessage});//errors:errorsMessage
    } 
    next()
}
}
