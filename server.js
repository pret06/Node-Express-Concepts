require("dotenv").config()
const express = require('express')
const {configCors} = require('./config/corsConfig')
const {requestLogger , addTimeStamp} = require('./middleware/customMiddleware')
const {
    urlVersioning,
    headerVersioning,
    contentTypeVersioning
} = require('./middleware/versoiningMiddleware')
const { globalErrorHandler } = require("./middleware/errorHandler")
const {createBasicRateLimiter} = require('./middleware/rateLimit')
const itemRoutes = require('./routes/itemRoute')
const app = express()
const PORT = process.env.PORT || 3000


//Express JSON middleware
app.use(express.json())
app.use(requestLogger)
app.use(addTimeStamp)


app.use(urlVersioning('v1'))
app.use('/api/v1', itemRoutes)

app.use(configCors())
app.use(createBasicRateLimiter(2 , 15 * 60 * 1000)) //  max requests per window , converting 15 min to milliseconds

app.use(globalErrorHandler)

app.listen(PORT , ()=>{
    console.log(`Port is working fine on ${PORT}`)
})