import { DataService } from "../services/data.service.js";
import { v4 as uuid } from "uuid";
import { pathBuilder } from "../utils/utils.js";

const employeesPath = pathBuilder(["..", "data", "employees.json"]);

export class EmployeeModel {
  static async saveEmployees(employees) {
    await DataService.saveJSONFile(employeesPath, employees);
  }

  static async getAllEmployees() {
    const employees = await DataService.readJSONFile(employeesPath);

    return employees;
  }

  static async getEmployeeById(employeeId) {
    const employees = await this.getAllEmployees();

    const parsedEmployeeId = Number(employeeId);

    const foundEmployee = employees.find(
      (employee) => employee.id === parsedEmployeeId
    );

    if (!foundEmployee) throw new Error("Employee not found");

    return foundEmployee;
  }

  static async createEmployee(employeeData) {
    const employees = await this.getAllEmployees();

    const emailExists = employees.some(
      (employee) => employee.email === employeeData.email
    );

    if (emailExists) throw new Error("Email already exists!");

    const newEmployee = {
      id: uuid(),
      ...employeeData,
    };

    const updatedEmployees = [...employees, newEmployee];

    await this.saveEmployees(updatedEmployees);

    return newEmployee;
  }

  static async updateEmployee(employeeId, updateData) {
    const employees = await this.getAllEmployees();

    const foundEmployee = await this.getEmployeeById(employeeId);

    if (updateData.id) throw new Error("Invalid update");

    const updatedEmployee = { ...foundEmployee, ...updateData };

    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );

    await this.saveEmployees(updatedEmployees);

    return updatedEmployees;
  }

  static async deleteAllEmployees() {
    await this.saveEmployees([]);
  }

  static async deleteEmployee(employeeId) {
    const employees = this.getAllEmployees();

    const updatedEmployees = employees.filter(
      (employee) => employee.id !== employeeId
    );

    if (updatedEmployees.length === employees.length)
      throw new Error("Student not found");

    await this.saveEmployees(updatedEmployees);
  }
}
