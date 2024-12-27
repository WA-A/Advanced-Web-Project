export class AppError extends Error {
    constructor(message,statusCode){
     super(message);
     this.statusCode = statusCode; // statusCode like 409 // 400
    }
}