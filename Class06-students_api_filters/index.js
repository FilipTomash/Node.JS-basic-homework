import express from "express";
import { studentRouter } from "./routes/students.routes.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.port || "0.0.0.0";

const app = express();

app.use(express.json());

app.use("/students", studentRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server is up at ${PORT}`);
});
