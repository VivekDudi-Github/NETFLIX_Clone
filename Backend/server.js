import express from "express" ;
import cookieParser from "cookie-parser";

import authroutes from './route/auth.route.js'
import movieroutes from './route/movies.route.js'

import { ENV_VARS } from "./config/envVAr.js";
import { connectDB } from "./config/db.js";

const app = express();
const port = ENV_VARS.PORT


app.use(express.json({limit : '108kb'}))
app.use(cookieParser())

app.use('/api/v1/auth' , authroutes)
app.use('/api/v1/movies' , movieroutes)


app.listen(port ,() => {
    console.log("server started at http://localhost:"+port);
    connectDB();
})