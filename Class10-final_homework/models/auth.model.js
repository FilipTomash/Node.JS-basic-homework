import { DataService } from "../services/data.service.js";
import { pathBuilder } from "../utils/utils.js";
import Joi from "joi";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

const userShema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

class User {
  constructor(firstName, lastName, email, password) {
    this.id = uuid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.refreshToken = null;
  }
}

const usersPath = pathBuilder(["..", "data", "users.json"]);

export class AuthModel {
  static async getAllUsers() {
    return DataService.readJSONFile(usersPath);
  }
  static async saveUsers(userData) {
    await DataService.saveJSONFile(usersPath, userData);
  }

  static async getUserById(userId) {
    const users = await this.getAllUsers();

    const foundUser = users.find((user) => user.id === userId);

    if (!foundUser) throw new Error("User not found");

    return foundUser;
  }

  static async registerUser(userData) {
    const users = await this.getAllUsers();

    const userExists = users.some((user) => user.email === userData.email);

    if (userExists) throw new Error("Email already exists!");

    const validation = userShema.validate(userData);

    if (validation?.error) throw new Error(validation.error.details[0].message);

    const { firstName, lastName, email, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User(firstName, lastName, email, hashedPassword);

    const updatedUsers = [...users, newUser];

    await this.saveUsers(updatedUsers);

    const { password: userPassword, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  static async logInUser(credentials) {
    const users = await this.getAllUsers();

    const { email, password } = credentials;

    const foundUser = users.find((user) => email === user.email);

    if (!foundUser) throw new Error("Invalid credentials");

    const passwordCheck = await bcrypt.compare(password, foundUser.password);

    if (!passwordCheck) throw new error("Invalid credentials");

    const { password: userPassword, ...userWithoutPassword } = foundUser;

    return userWithoutPassword;
  }

  static async saveRefreshToken(userId, refreshToken) {
    const users = await this.getAllUsers();

    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        user.refreshToken = refreshToken;
        return user;
      }
      return user;
    });

    await this.saveUsers(updatedUsers);
  }

  static async deleteRefreshToken(userId) {
    const users = await this.getAllUsers();

    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        user.refreshToken = null;
        return user;
      }
      return user;
    });

    await this.saveUsers(updatedUsers);
  }
}
