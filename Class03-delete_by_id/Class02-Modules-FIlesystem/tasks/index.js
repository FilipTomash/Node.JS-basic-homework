// We can rename imports with our desired names using as
import { v4 as uuid } from "uuid";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DataService } from "./data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tasksPath = path.join(__dirname, "tasks.json");

const getAllTasks = async () => {
  try {
    const tasks = await DataService.readJSONFile(tasksPath);

    return tasks;
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
};

const saveTasks = async (tasks) => {
  await DataService.saveJSONFile(tasksPath, tasks);
};

const createTask = async (text) => {
  try {
    const tasks = await getAllTasks();

    const newTask = {
      id: uuid(),
      text,
      isFinished: false,
    };

    tasks.push(newTask);

    await saveTasks(tasks);
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (taskid) => {
  try {
    const tasks = await getAllTasks();

    const foundTask = tasks.find((task) => task.id === taskid);

    console.log("Found task", foundTask);

    if (!foundTask) throw new Error("Task not found");

    foundTask.isFinished = true;

    await saveTasks(tasks);
  } catch (error) {
    console.log(error);
  }
};

const app = async () => {
  await updateTask("04b936b5-0c05-4d5e-b8fd-eea30a1e861c");
  const tasks = await getAllTasks();
};

app();
