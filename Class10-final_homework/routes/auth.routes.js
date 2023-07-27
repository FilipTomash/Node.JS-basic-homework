import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/register", AuthController.registerUser);
authRouter.post("/login", AuthController.logInUser);
authRouter.get("/refresh-token", AuthController.renewAccessToken);
authRouter.get("/logout", AuthController.logOutUser);
