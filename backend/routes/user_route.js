import express from "express"
import { Login, Logout, SignUp,Alluser } from "../controller/user_contoller.js"
import secureRoute from "../middleware/secureRoute.js";
const router=express.Router();
router.post("/signup",SignUp)
router.post("/login",Login)
router.post("/logout",Logout)
router.get("/alluser",secureRoute,Alluser)



export default router;