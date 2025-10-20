import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createTokenAndSave from "../jwt/generateToken.js";
import mongoose from "mongoose";
export const SignUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // ✅ 1. Check passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // ✅ 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // ✅ 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 4. Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    if(newUser){
        createTokenAndSave(newUser._id,res);
        res.status(201).json({ message: "User registered successfully",newUser });
    }
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const Login=async(req,res)=>{
try{
        const {email,password}=req.body;
    const isUser=await User.findOne({email})
    if(!isUser){
        return res.status(400).json({error:"Invaild User"});
    }
    const ispass=await bcrypt.compare(password,isUser.password);
    if(!ispass){
       return  res.status(400).json({error:"Invaild User"});
    }
    createTokenAndSave(isUser._id,res);
    res.status(200).json({message:"User Login Succesfully",user:{
      id:isUser._id,
   name:isUser.name,
   email:isUser.email
    }});
}
catch(err){
    res.status(500).json({message:"Internal Error"});
}
}
export const Logout=(req,res)=>{
  try{
    res.clearCookie("jwt")
    res.status(200).json({message:"User Logout Succesfully"})
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:"Internal Error"});
  }
}

export const Alluser = async (req, res) => {
  try {
    // ✅ Convert logged-in user's ID to ObjectId
    const loggedUserId = new mongoose.Types.ObjectId(req.user._id);

    // ✅ Exclude logged-in user from list
    const users = await User.find({ _id: { $ne: loggedUserId } })
      .select("-password")
      .sort({ name: 1 });

    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

