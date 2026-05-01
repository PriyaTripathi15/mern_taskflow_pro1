import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (user) => jwt.sign({ id: user._id, role: user.role }, "secret");

export const register=async(req,res)=>{
 const {name,email,password}=req.body;
 const hash=await bcrypt.hash(password,10);
 const user=await User.create({name,email,password:hash});
 const token=signToken(user);
 res.json({token,user});
};

export const login=async(req,res)=>{
 const {email,password}=req.body;
 const user=await User.findOne({email});
 if(!user) return res.status(400).json({msg:"Invalid"});
 const ok=await bcrypt.compare(password,user.password);
 if(!ok) return res.status(400).json({msg:"Invalid"});
 const token=signToken(user);
 res.json({token,user});
};
