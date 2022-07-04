// FROM EXTERNAL

const path = require('path');
const http = require('http');
const express = require('express');
const app = express()
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');


// GOT FROM OTHER SELF MADE FILES
const { router } = require('./server/routes/router.js')
// (REASON INSIDE {}  BECAUSE WE PASSED NOT SINGLY ,(WE PASSED IN A OBJECT ), MANY OOBJECTS CAN BE THERE SO DESTRUCTURING OF OBJECTS)
const connectDB = require('./server/database/connection')


// SETTING PORT
dotenv.config('config.env')
const PORT = 3000 || process.env.PORT



// Database
connectDB.connectDB()

// VIEW ENGINE
app.set('view engine','ejs')


// MIDDLEWARE
app.use(express.json())
app.use(express.static(path.join(__dirname,'Public')))
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(router)


app.listen(PORT,()=>{
    console.log(`Server Running At http://localhost:${PORT}`)
});

