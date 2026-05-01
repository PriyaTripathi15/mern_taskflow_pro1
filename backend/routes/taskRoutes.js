import express from "express";
import {getTasks,addTask,toggleTask,deleteTask} from "../controllers/taskController.js";
import {protect} from "../middleware/authMiddleware.js";
const r=express.Router();
r.get("/",protect,getTasks);
r.post("/",protect,addTask);
r.put("/:id",protect,toggleTask);
r.delete("/:id",protect,deleteTask);
export default r;
