// Error Handler Middleware (Custom Error Class)

class APIError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
        this.name = "APIError"
    }
}

const asyncHandler = (fn) => (req,res,next) =>{
    Promise.resolve(fn(req,res,next)).catch(next)
}

const globalErrorHandler = (err,req,res,next)=>{
    console.log(err.stack)

    if(err instanceof APIError){
        return res.status(err.statusCode).json({
            status : "error",
            message : err.message
        })
    }
   // handle mongoose validation 
    else if(err.name === "validation error"){
        return res.status(400).json({
            status : "error",
            message : "validation error"
        })
    }

    else{
        return res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
          });
    }
    
}


module.exports = {asyncHandler , globalErrorHandler, APIError} 