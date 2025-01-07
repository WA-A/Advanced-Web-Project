import multer from 'multer';


export const FileValue = {
    image: ['image/jpeg','image/png','image/webp'],
    file:['application/pdf'],
    excle:['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
}

function fileUpload(customValue = []){
    
    const storage = multer.diskStorage(
         {
        //     destination:(req,res,cb)=>{ // cb is function call back
        //         cb(null, 'Uploads'); // nul : if make error / then name file
        //     } ,

        //     filename:  (req, file, cb)=>{
        //         cb(null,Date.now()+Math.random()+"_"+file.originalname) // controll to name file when reguest the same file
        //       // Date -> return time in server
        //       // 2- use libary nanoid
        //     }
         }
    );

    function fileFilter (req, file, cb) {
         if (customValue.includes(file.mimetype)){
        cb(null,true);
     }
     else{
         cb("inavlid format",false);
     }
    
       }
       const upload = multer ({fileFilter,storage});
       return upload;
}

export default fileUpload;