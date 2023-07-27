import { Router } from "express";
import {
  gatAllStudents,
  getStudentbyId,
  createStudent,
  updateStudent,
  deleteStudentById,
  deleteAllStudents,
} from "../students.js";

export const studentRouter = Router();

studentRouter.get("/", async (req, res) => {
  try {
    // const filters = req.query;
    const { query: filters } = req;
    const students = await gatAllStudents(filters);

    return res.json(students);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

studentRouter.get("/:id", async (req, res) => {
  try {
    const { id: studentId } = req.params;

    const foundStudent = await getStudentbyId(studentId);

    res.json(foundStudent);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

studentRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, gender, city } = req.body;

    if (!firstName || !lastName || !email || !gender || !city)
      throw new Error("Invalid student data!");

    const newStudent = await createStudent(
      firstName,
      lastName,
      email,
      gender,
      city
    );
    return res.status(201).json(`New student was created: ${newStudent}`);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

studentRouter.patch("/:id", async (req, res) => {
  try {
    const updateData = req.body;
    const { id: studentId } = req.params;

    if (updateData.id) throw new Error("Invalid update request!");

    const updatedStudent = await updateStudent(studentId, updateData);
    return res.status(200).send(updatedStudent);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

studentRouter.delete("/:id", async (req, res) => {
  try {
    const { id: studentId } = req.params;

    await deleteStudentById(studentId);

    res.sendStatus(204);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

studentRouter.delete("/", async (req, res) => {
  try {
    await deleteAllStudents();
    res.sendStatus(204);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
