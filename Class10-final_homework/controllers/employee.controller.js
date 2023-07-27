import { EmployeeModel } from "../models/employees.model.js";

export class EmployeeController {
  static async getAllEmployees(req, res) {
    try {
      const authorizationHeader = req.headers.authorization;

      const employees = await EmployeeModel.getAllEmployees();

      return res.json(employees);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }

  static async getEmployeeById(req, res) {
    try {
      const { id: employeeId } = req.params;

      const foundEmployee = await EmployeeModel.getEmployeeById(employeeId);

      return res.json(foundEmployee);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }

  static async createEmployee(req, res) {
    try {
      const employeeData = req.body;

      const newEmployee = await EmployeeModel.createEmployee(employeeData);

      return res.status(201).json(newEmployee);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }

  static async updateEmployee(req, res) {
    try {
      const { id: employeeId } = req.params;
      const updateData = req.body;

      const updatedEmployee = await EmployeeModel.updateEmployee(
        employeeId,
        updateData
      );

      return res.json(updatedEmployee);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }
  static async deleteAllemployees(req, res) {
    try {
      await EmployeeModel.deleteAllemployees();

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }

  static async deleteEmployee(req, res) {
    try {
      const { id: employeeId } = req.params;

      await EmployeeModel.deleteEmployee(employeeId);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }
}
