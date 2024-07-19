import { createJWT } from '../libs/jwt.js';
import AuthModel from '../models/auth.model.js';

export default class AuthController {
  static async register(req, res) {
    const { emailAddress, password, username } = req.body;
  }

  static async logIn(req, res) {
    const { emailAddress, password } = req.body;
  }
  static async logOut(req, res) {}

  static async recoverAccount(req, res) {}
}
