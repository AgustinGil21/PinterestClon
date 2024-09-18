import AuthModel from '../models/auth.model.js';
import { createJWT } from '../libs/jwt.js';
import generateUserAuthCode from '../libs/generateUserAuthCode.js';
import {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
  recoverAccountSchema,
  checkEmailAddressSchema,
} from '../schemas/auth.schema.js';
import { resend } from '../resend.js';
import { recoverAccountEmail } from '../email.js';
import { NODE_ENV } from '../config.js';
import { uploadFileToCloudinary } from '../libs/cloudinary-files.js';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 1000 * 60 * 60 * 24 * 30,
  secure: NODE_ENV === 'production',
};

export default class AuthController {
  static async checkIfEmailAlreadyExists(req, res) {
    const { emailAddress } = req.body;

    try {
      const result = checkEmailAddressSchema.safeParse({ emailAddress });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const alreadyExists = await AuthModel.checkIfEmailAlreadyExists({
        emailAddress,
      });

      if (alreadyExists.ok) {
        return res.status(200).json({ message: 'Valid email address!' });
      }

      return res.status(400).json({ message: 'Email address already exists!' });
    } catch (err) {
      return res.status(400).json({ message: 'Email address already exists!' });
    }
  }

  static async register(req, res) {
    let avatar;

    const {
      password,
      emailAddress,
      birthdate,
      username,
      genderId,
      countryId,
      langId,
      avatarBackground,
      avatarLetterColor,
      avatarLetter,
    } = req.body;

    try {
      const result = registerSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    if (req.files?.avatar) {
      const result = await uploadFileToCloudinary(
        req.files.avatar.tempFilePath
      );

      avatar = result.secure_url;
    }

    try {
      const data = await AuthModel.register({
        password,
        emailAddress,
        birthdate,
        username,
        genderId,
        countryId,
        langId,
        avatarBackground,
        avatarLetterColor,
        avatarLetter,
        avatar,
      });

      if (data.ok) {
        const { id } = data.response;

        const accessToken = await createJWT({
          id,
        });

        res
          .status(200)
          .cookie('access_token', accessToken, cookieOptions)
          .json({ message: 'User successfully created!' });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: 'User already exists!' });
    }
  }

  static async logIn(req, res) {
    const { emailAddress, password } = req.body;

    try {
      const result = loginSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const data = await AuthModel.logIn({
        emailAddress,
        password,
      });

      if (data.ok) {
        const { id } = data.response;

        const accessToken = await createJWT({
          id,
        });

        res
          .status(200)
          .cookie('access_token', accessToken, cookieOptions)
          .json({ message: 'User successfully logged in!' });
      }
    } catch (err) {
      return res
        .status(404)
        .json({ message: 'User not found! Try to create a new account!' });
    }
  }

  static async logOut(req, res) {
    res.cookie('access_token', '', {
      expires: new Date(Date.now()),
    });

    return res.status(200).json({ message: 'User successfully logout!' });
  }

  static async recoverAccount(req, res) {
    const { emailAddress } = req.body;

    try {
      const result = recoverAccountSchema.safeParse({ emailAddress });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const checkIfExists = await AuthModel.recoverAccount({ emailAddress });

      if (checkIfExists.ok) {
        const resetPasswordEmail = await recoverAccountEmail({ emailAddress });

        const { data, error } = await resend.emails.send(resetPasswordEmail);

        if (error) {
          console.log(error);
          return res.status(400).json({ message: 'Cannot send email!' });
        }

        return res.status(200).json({ data });
      }
    } catch (err) {
      return res.status(404).json({ message: 'User not found!' });
    }
  }

  static async resetPassword(req, res) {
    const { password } = req.body;
    const { emailAddress } = req.params;

    try {
      const result = resetPasswordSchema.safeParse({ password, emailAddress });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const data = await AuthModel.resetPassword({ password, emailAddress });

      if (data.ok) {
        return res
          .status(200)
          .json({ message: 'Account successfully recover!' });
      }
    } catch (err) {
      return res.status(401).json({ message: 'Cannot reset password!' });
    }
  }
}
