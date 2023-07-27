import { Router } from "express";
import { authRouter } from "../routes/auth.routes.js";
import { employeeRouter } from "../routes/employee.routes.js";
import { tokenValidator } from "../middlewares/token-validator.middleware.js";

export const globalRouter = Router();

globalRouter.use("/", authRouter);
globalRouter.use("/employees", tokenValidator, employeeRouter);
