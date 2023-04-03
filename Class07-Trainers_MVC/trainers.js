import path from "node:path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "node:url";
import { DataService } from "./services/data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const trainersPath = path.join(
  __dirname,
  "trainers_data",
  "trainers-data.json"
);

export const getTrainerbyId = async (trainerId) => {
  const trainer = await getAllTrainers();

  const foundTrainer = trainer.find((trainer) => trainer.id === trainerId);
  if (!foundTrainer) throw new Error("Trainer not found!");

  return foundTrainer;
};

export const createTrainer = async (firstName, lastName, email) => {
  const trainers = await getAllTrainers();
  //   let randomBoolean = Math.random() < 0.5;
  //   let ranNum = Math.floor(Math.random() * 10) + 1;

  const trainer = {
    id: uuid(),
    firstName,
    lastName,
    email,
    isCurrentluTeaching: Math.random() < 0.5,
    timeEmployed: `${Math.floor(Math.random() * 10) + 1} year and ${
      Math.floor(Math.random() * 10) + 1
    } months.`,
    coursesFinished: Math.floor(Math.random() * 10) + 1,
  };

  const updatedTrainers = [...trainers, trainer];

  await saveTrainers(updatedTrainers);

  return trainers;
};

export const updateTrainerInfo = async (trainerId, updateData) => {
  const trainers = await getAllTrainers();
  const foundTrainer = await getTrainerbyId(trainerId);

  const updatedTrainer = {
    ...foundTrainer,
    ...updateData,
  };

  const updatedTrainers = trainers.map((trainer) => {
    if (trainer.id === updatedTrainer.id) return updatedTrainer;
    return trainer;
  });

  await saveTrainers(updatedTrainers);
};

export const deleteTrainerbyId = async (trainerId) => {
  const trainers = await getAllTrainers();
  console.log(trainers);
  const updatedTrainers = trainers.filter(
    (trainer) => trainer.id !== trainerId
  );
  console.log(updatedTrainers);

  if (updatedTrainers.length === trainers.length)
    throw new Error("Trainer not found!");

  return await saveTrainers(updatedTrainers);
};

export const deleteAllTrainers = async () => {
  await saveTrainers([]);
};
