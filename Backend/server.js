import express from "express" ;
import cookieParser from "cookie-parser";

import authRoutes from './route/auth.route.js'
import movieRoutes from './route/movies.route.js'
import tvRoutes from './route/tv.routes.js' 

import { ENV_VARS } from "./config/envVAr.js";
import { connectDB } from "./config/db.js";

const app = express();
const port = ENV_VARS.PORT


app.use(express.json({limit : '108kb'}))
app.use(cookieParser())

app.use('/api/v1/auth' , authRoutes)
app.use('/api/v1/movies' , movieRoutes)
app.use('/api/v1/tv' , tvRoutes)

app.listen(port ,() => {
    console.log("server started at http://localhost:"+port);
    connectDB();
})