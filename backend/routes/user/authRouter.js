import express from "express"
import  {Login,Signup} from "../../controller/authController.js"

const router = express.Router();


router.post('/login',Login);

router.post('/signup',Signup);


export default router