import express from "express";
import { login, register, googleLogin } from "../controller/auth.js";
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/google", googleLogin);
export default route;
