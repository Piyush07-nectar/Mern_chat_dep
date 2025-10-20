import jwt from "jsonwebtoken"
const createTokenAndSave=(userid,res)=>{
    const token=jwt.sign({userid},process.env.JWT_TOKEN,{
        expiresIn:"10d",
    });
    res.cookie("jwt",token,{
        httpOnly:false,
        secure:true,
        sameSite:"none"
    });
}
export default createTokenAndSave;