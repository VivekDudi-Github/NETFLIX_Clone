import express from "express" ;
import authroutes from './route/auth.route.js'
import { ENV_VARS } from "./config/envVAr.js";
import { connectDB } from "./config/db.js";

const app = express();
const port = ENV_VARS.PORT


app.use(express.json({limit : '108kb'}))
app.use('/api/v1/auth' , authroutes)

app.listen(port ,() => {
    console.log("server started at http://localhost:"+port);
    connectDB();
})