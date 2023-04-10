import { Router } from "express";
import { productRouter } from "../routes/product.routes.js";
import { orderRouter } from "../routes/order.routes.js";

export const globalRouter = Router();

globalRouter.use("/products", productRouter);
globalRouter.use("/orders", orderRouter);
