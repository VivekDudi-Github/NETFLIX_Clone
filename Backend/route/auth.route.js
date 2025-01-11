import express from "express" ;
import { signupFunc , loginFunc , logoutFunc ,authCheckFunc } from "../controller/auth.controller.js";
import {protectRoute} from '../middleware/protectRoute.js'

const router = express.Router();

router.post('/signup' , signupFunc
);

router.post('/login' ,loginFunc
);

router.post('/logout' ,logoutFunc
);

router.get('/authCheck' ,protectRoute , authCheckFunc)

export default router;