import path from "node:path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "node:url";
import { DataService } from "../services/data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const trainersPath = path.join(__dirname, "..", "data", "trainers-data.json");

export class TrainersModel {
  static async saveTrainers(trainersData) {
    await DataService.saveJSONFile(trainersPath, trainersData);
  }

  static async getAllTrainers() {
    const trainers = await DataService.readJSONFile(trainersPath);

    return trainers;
  }

  static async getTrainersById(trainerId) {
    const trainers = await this.getAllTrainers();

    const foundTrainer = trainers.find((trainer) => trainer.id === trainerId);

    if (!foundTrainer) throw new Error("Trainer not found!");

    return foundTrainer;
  }

  static async createTrainer(trainerData) {
    const trainers = await this.getAllTrainers();
    let randomBoolean = Math.random() < 0.5;
    let timeRanNum = Math.floor(Math.random() * 10) + 1;
    let coursesRanNum = Math.floor(Math.random() * 10) + 1;

    const emailExists = trainers.some(
      (trainer) => trainer.email === trainerData.email
    );

    if (emailExists) throw new Error("User already exists");

    const newTrainer = {
      id: uuid(),
      ...trainerData,
      isCurrentlyTeaching: randomBoolean,
      timeEmployed: `${timeRanNum} years`,
      coursesFinished: coursesRanNum,
    };

    const updatedTrainers = [...trainers, newTrainer];

    await this.saveTrainers(updatedTrainers);

    return newTrainer;
  }

  static async updateTrainer(trainerId, updateData) {
    const trainers = await this.getAllTrainers();

    const foundTrainer = await this.getTrainersById(trainerId);

    if (updateData.id) throw new Error("Invalid updates!");

    const updatedTrainer = { ...foundTrainer, ...updateData };

    const updatedTrainers = trainers.map((trainer) =>
      trainer.id === updatedTrainer.id ? updatedTrainer : trainer
    );

    await this.saveTrainers(updatedTrainers);

    return updatedTrainer;
  }

  static async deleteAllTrainers() {
    await this.saveTrainers([]);
  }

  static async deleteTrainer(trainerId) {
    const trainers = await this.getAllTrainers();

    const updatedTrainers = trainers.filter(
      (trainer) => trainer.id !== trainerId
    );

    if (updatedTrainers.length === trainers.length)
      throw new Error("Trainer not found");

    await this.saveTrainers(updatedTrainers);
  }
}
