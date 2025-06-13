import express from "express"
import { addUser, loginUser } from "../controllers/userController.js";

const route = express.Router();

route.post("/addUser", addUser);
route.post("/loginUser", loginUser);

export default route;