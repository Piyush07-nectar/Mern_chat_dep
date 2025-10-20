import jwt from "jsonwebtoken"
import User from "../models/User.js"

const secureRoute =async (req,res,next) => {
try{
  const token=req.cookies.jwt;
  if(!token){
    return res.status(401).json({error:"No Token is Found"});
  }
  const decode=jwt.verify(token,process.env.JWT_TOKEN);
   if(!decode){
    return res.status(401).json({error:"Invalid Token"});
  }
  const user=await User.findById(decode.userid).select("-password");
   if(!user){
    return res.status(401).json({error:"No User"});
  }
  req.user=user
  next();
}
catch(err){
    console.log("Error"+err)
    res.status(500).json({error:"Internal Error"})
}
}

export default secureRoute
