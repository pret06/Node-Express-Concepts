const cors = require('cors')

const configCors = () =>{
    return cors({
        // This will tell which domain can access our api
        origin:(origin,callback)=>{
            const allowedOrigins = [
             "http://localhost:3000", // Local development
             "https://yourcustomdomain.com", // Production domain
            ]

        if(!origin || !allowedOrigins.indexOf(origin) !== -1){  // Allowing the request will give 0 or 1 or if any other domain try to access will give -1
            callback(null , true)
        } else{
            callback(new Error("Not allowed by CORS")); // Block the request
        }
        },
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
        allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"], // Allowed request headers
        exposedHeaders: ["X-Total-Count", "Content-Range"], // Headers exposed to the client
        credentials: true, // Allow cookies and authentication headers
        preflightContinue: false, // Do not pass preflight requests to next middleware
        maxAge: 600, // Cache preflight response for 10 minutes
        optionsSuccessStatus: 204, // Send 204 No Content for preflight responses
    })
}

module.exports = {configCors}