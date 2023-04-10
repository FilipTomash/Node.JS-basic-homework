import { TrainersModel } from "../models/trainers.model.js";

export class TrainersController {
  static async getAllTrainers(req, res) {
    try {
      const trainers = await TrainersModel.getAllTrainers();

      return res.send(trainers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }
  static async getTrainersById(req, res) {
    try {
      const { id: trainerId } = req.params;
      const foundTrainer = await TrainersModel.getTrainersById(trainerId);

      return res.json(foundTrainer);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }

  static async createTrainer(req, res) {
    try {
      const trainerData = req.body;

      const newStudent = await TrainersModel.createTrainer(trainerData);

      return res.status(201).json(newStudent);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }

  static async updateTrainer(req, res) {
    try {
      const { id: trainerId } = req.params;
      const updateData = req.body;

      const updatedTrainer = await TrainersModel.updateTrainer(
        trainerId,
        updateData
      );

      return res.json(updatedTrainer);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }

  static async deleteAllTrainers(req, res) {
    try {
      await TrainersModel.deleteAllTrainers();

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }

  static async deleteTrainer(req, res) {
    try {
      const { id: trainerId } = req.params;

      await TrainersModel.deleteTrainer(trainerId);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }
}
