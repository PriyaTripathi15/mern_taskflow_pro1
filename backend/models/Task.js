import mongoose from "mongoose";
export default mongoose.model("Task", new mongoose.Schema({
 title:String,
 completed:{type:Boolean,default:false},
 user:String
},{timestamps:true}));
