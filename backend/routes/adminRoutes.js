import express from "express";
import { getUsers, updateUser, deleteUser } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const r = express.Router();

r.use(protect, adminOnly);
r.get("/users", getUsers);
r.put("/users/:id", updateUser);
r.delete("/users/:id", deleteUser);

export default r;