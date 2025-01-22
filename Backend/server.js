import express from "express" ;
import cookieParser from "cookie-parser";

import authRoutes from './route/auth.route.js'
import movieRoutes from './route/movies.route.js'
import tvRoutes from './route/tv.routes.js' 
import searchRoutes from './route/search.route.js'
import historyRoutes from './route/history.route.js'
import watchRoutes from './route/watch.route.js'

import { protectRoute } from "./middleware/protectRoute.js";
import { ENV_VARS } from "./config/envVAr.js";
import { connectDB } from "./config/db.js";

const app = express();
const port = ENV_VARS.PORT


app.use(express.json({limit : '108kb'}))
app.use(cookieParser())

app.use('/api/v1/auth' , authRoutes)
app.use('/api/v1/movies' , protectRoute , movieRoutes)
app.use('/api/v1/tv' ,protectRoute , tvRoutes)
app.use('/api/v1/search' , protectRoute , searchRoutes)
app.use('/api/v1/history' , protectRoute , historyRoutes) 
app.use('/api/v1/watch' , protectRoute , watchRoutes )

app.listen(port ,() => {
    console.log("server started at http://localhost:"+port);
    connectDB();
})