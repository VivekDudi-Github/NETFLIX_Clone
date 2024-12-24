import express from "express" ;
import { signupFunc , loginFunc , logoutFunc } from "../controller/auth.controller.js";

const router = express.Router();

router.post('/signup' , signupFunc
);

router.post('/login' ,loginFunc
);

router.post('/logout' ,logoutFunc
);


export default router;