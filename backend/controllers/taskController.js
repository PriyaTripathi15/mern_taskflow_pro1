import Task from "../models/Task.js";

export const getTasks=async(req,res)=>{
 const tasks=await Task.find({user:req.user.id});
 res.json(tasks);
};

export const addTask=async(req,res)=>{
 const t=await Task.create({title:req.body.title,user:req.user.id});
 res.json(t);
};

export const toggleTask=async(req,res)=>{
 const t=await Task.findById(req.params.id);
 t.completed=!t.completed;
 await t.save();
 res.json(t);
};

export const deleteTask=async(req,res)=>{
 await Task.findByIdAndDelete(req.params.id);
 res.json({msg:"Deleted"});
};
