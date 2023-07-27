import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../const/jwt.const.js";
import { AuthModel } from "../models/auth.model.js";

export class AuthController {
  static async registerUser(req, res) {
    try {
      const newUser = await AuthModel.registerUser(req.body);

      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ msg: error.message });
    }
  }

  static async logInUser(req, res) {
    try {
      const user = AuthModel.logInUser(req.body);

      const accessToken = createAccessToken(user.id);
      console.log(accessToken);

      res.set("access-token", accessToken);

      const refreshToken = createRefreshToken(user.id);

      await AuthModel.saveRefreshToken(user.id, refreshToken);

      res.set("refresh-token", refreshToken);

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(401).send({ msg: error.message });
    }
  }

  static async renewAccessToken(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];

      if (!refreshToken) throw new Error();

      const vefifiedToken = verifyRefreshToken(refreshToken);

      const { userId } = vefifiedToken;

      const foundUser = await AuthModel.getUserById(userId);

      if (refreshToken !== foundUser.refreshToken) throw new Error();

      const accessToken = createAccessToken(foundUser.id);

      res.set("access-token", accessToken);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.sendStatus(403);
    }
  }
  static async logOutUser(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];

      const { userId } = verifyRefreshToken(refreshToken);

      await AuthModel.deleteRefreshToken(userId);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
}
