import express from "express";
import {
  getAllTrainers,
  getTrainerbyId,
  createTrainer,
  updateTrainerInfo,
  deleteTrainerbyId,
  deleteAllTrainers,
} from "./trainers.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.port || "0.0.0.0";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const allTrainers = await getAllTrainers();

    return res.json(allTrainers);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id: trainerId } = req.params;

    const foundTrainer = await getTrainerbyId(trainerId);

    res.json(foundTrainer);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email)
      throw new Error("Invalid trainer data!");

    const newTrainer = await createTrainer(firstName, lastName, email);
    return res.status(201).json(`New trainer was created: ${newTrainer}`);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const updateData = req.body;
    const { id: trainerId } = req.params;

    if (updateData.id) throw new Error("Invalid update request!");

    const updatedTrainer = await updateTrainerInfo(trainerId, updateData);
    return res.status(200).send(updatedTrainer);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id: trainerId } = req.params;

    await deleteTrainerbyId(trainerId);

    res.sendStatus(204);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

app.delete("/", async (req, res) => {
  try {
    await deleteAllTrainers();
    res.sendStatus(204);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server is up at ${PORT}`);
});
