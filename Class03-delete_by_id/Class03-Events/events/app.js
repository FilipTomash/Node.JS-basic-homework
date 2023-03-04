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

const saveTasks = async tasks => {
  await DataService.saveJSONFile(tasksPath, tasks);
};


const updateTask = async taskid => {
  try {
    const tasks = await getAllTasks();

    const foundTask = tasks.filter(task => task.id !== taskid);

    console.log("Found task", foundTask);

    if (!foundTask) throw new Error("Task not found");

    await saveTasks(tasksPath, foundTask);
  } catch (error) {
    console.log(error);
  }
};

const app = async () => {
  await updateTask("34f493aa-2c32-4f34-8ac1-b0199bd503bd");
};

app();
