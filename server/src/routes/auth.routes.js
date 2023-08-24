import express from "express";
import {
  test,
  registerUser,
  loginUser,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/", test);
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;
