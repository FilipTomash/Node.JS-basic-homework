import { Router } from "express";
import { TrainersController } from "../controllers/trainers.controller.js";

export const trainerRouter = Router();

trainerRouter.get("/", TrainersController.getAllTrainers);

trainerRouter.get("/:id", TrainersController.getTrainersById);

trainerRouter.post("/", TrainersController.createTrainer);

trainerRouter.patch("/:id", TrainersController.updateTrainer);

trainerRouter.delete("/:id", TrainersController.deleteTrainer);

trainerRouter.delete("/", TrainersController.deleteAllTrainers);
