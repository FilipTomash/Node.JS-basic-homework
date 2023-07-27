import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller.js";

export const employeeRouter = Router();

employeeRouter.get("/", EmployeeController.getAllEmployees);
employeeRouter.get("/:id", EmployeeController.getEmployeeById);
employeeRouter.post("/", EmployeeController.createEmployee);
employeeRouter.patch("/:id", EmployeeController.updateEmployee);
employeeRouter.delete("/all", EmployeeController.deleteAllemployees);
employeeRouter.delete("/:id", EmployeeController.deleteEmployee);
