import path from "node:path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "node:url";
import { DataService } from "./services/data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const studentsPath = path.join(__dirname, "data", "students.json");

const saveStudents = async (studentsData) => {
  await DataService.saveJSONFile(studentsPath, studentsData);
};

export const gatAllStudents = async (filters) => {
  let students = await DataService.readJSONFile(studentsPath);

  if (filters?.gender) {
    students = students.filter((student) =>
      filters.gender === "Male"
        ? student.gender === "Male"
        : student.gender === "Female"
    );
  }
  if (filters?.sortBy) {
    if (filters.sortBy === "age") {
      students = students.sort(
        (student1, student2) => student1.age - student2.age
      );
    } else if (filters.sortBy === "averageGrade") {
      students = students.sort(
        (student1, student2) => student1.averageGrade - student2.averageGrade
      );
    }
  }
  return students;
};

export const getStudentbyId = async (studentId) => {
  const students = await gatAllStudents();

  const foundStudent = students.find((student) => student.id === studentId);
  if (!foundStudent) throw new Error("Student not found!");

  return foundStudent;
};

export const createStudent = async (
  firstName,
  lastName,
  email,
  gender,
  city
) => {
  const students = await gatAllStudents();

  const student = {
    id: uuid(),
    firstName,
    lastName,
    email,
    gender,
    city,
    averageGrade: Math.floor(Math.random() * 5) + 1,
    age: Math.floor(Math.random() * 40) + 1,
  };

  const updatedStudents = [...students, student];

  await saveStudents(updatedStudents);

  return students;
};

export const updateStudent = async (studentId, updateData) => {
  const student = await gatAllStudents();
  const foundStudent = await getStudentbyId(studentId);

  const updatedStudent = {
    ...foundStudent,
    ...updateData,
  };

  const updatedStudents = student.map((student) => {
    if (student.id === updatedStudent.id) return updatedStudent;
    return student;
  });

  await saveStudents(updatedStudents);
};

export const deleteStudentById = async (studentId) => {
  const students = await gatAllStudents();

  const updatedStudents = students.filter(
    (student) => student.id !== studentId
  );

  if (updatedStudents.length === students.length)
    throw new Error("Student not found!");

  return await saveStudents(updatedStudents);
};

export const deleteAllStudents = async () => {
  await saveStudents([]);
};
