export const Validation = (schema) => {
    return (req, res, next) => {
        const errorsMessage = [];

        
        if (req.file) {
            req.body.PictureProfile = req.file;
        }

        
        const mergedData = { ...req.body, ...req.params, ...req.query };

        
        const { error } = schema.validate(mergedData, { abortEarly: false }); 
        if (error) {
            error.details.forEach(err => {
                const key = err.context.key;
                errorsMessage.push({ [key]: err.message }); 
            });
            return res.status(400).json({ message: "Validation Error", errors: errorsMessage });
        }
        
       
        next();
    };
};
