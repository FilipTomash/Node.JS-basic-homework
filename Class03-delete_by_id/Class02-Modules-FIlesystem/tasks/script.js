import * as http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DataService } from "./data.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tasksPath = path.join(__dirname, "tasks.json");

const server = http.createServer((request, response) => {
  const url = request.url;
  if (url === "/") {
    response.setHeader("Content-type", "text/html");
    response.write("<h1>Welcome to my second Server</h1>");
    return response.end();
  }
  if (url === "/tasks") {
    const getAllTasks = async () => {
      try {
        const tasks = await DataService.readJSONFile(tasksPath);

        return tasks;
      } catch (error) {
        console.log("Something went wrong");
        console.log(error);
      }
    };
    response.setHeader("Content-type", "application/json");
    response.write();
    return response.end();
  }

  return response.end();
});

server.listen(4001, () => {
  console.log("The server is listening on port 4001!");
});
