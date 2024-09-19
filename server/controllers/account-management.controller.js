import { deleteCloudinaryFile } from '../libs/cloudinary-files.js';
import { normalizeDate } from '../libs/date.js';
import { detectObjectChanges } from '../libs/detectObjectChanges.js';
import { objectsCompare } from '../libs/objectsCompare.js';
import AccountManagementModel from '../models/account-management.model.js';
import {
  changePasswordSchema,
  editPersonalInfoSchema,
  newPasswordSchema,
} from '../schemas/account-management.schema.js';

export default class AccountManagementController {
  static async getData(req, res) {
    const { id } = req.user;

    try {
      const data = await AccountManagementModel.getData({ id });

      if (data.ok) {
        const userData = data.response;
        res.status(200).json({ userData });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get user data!' });
    }
  }

  static async changePersonalInfo(req, res) {
    const { id } = req.user;
    let userDataObject = {};

    try {
      const result = editPersonalInfoSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    const objectSkeleton = {
      emailAddress: '',
      birthdate: '',
      gender: '',
      country: '',
      language: '',
    };

    try {
      const data = await AccountManagementModel.getInfoData({ id });

      if (data.ok) {
        const { response: userData } = data;
        const normalizedDate = normalizeDate(userData.birthdate);

        // La fecha que viene de la base de datos
        // contiene marca de tiempo, lo que genera
        // que la función detecte como un cambio
        // cada vez que el cliente mandaba una
        // fecha sin importar si era igual o no.
        // Gracias a este cambio, eso ya no sucederá.

        userData.birthdate = normalizedDate;

        userDataObject = objectsCompare(userData, req.body, objectSkeleton);
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get user data!' });
    }

    try {
      const { emailAddress, birthdate, gender, country, language } =
        userDataObject;

      const data = await AccountManagementModel.editData({
        id,
        emailAddress,
        birthdate,
        gender,
        country,
        language,
      });

      if (data.ok) {
        return res
          .status(200)
          .json({ message: 'User data successfully updated!' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot change user data!' });
    }
  }

  static async changePassword(req, res) {
    const { id } = req.user;
    const { prevPassword, newPassword: password } = req.body;

    try {
      const result = changePasswordSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'internal error!' });
    }

    try {
      const result = await AccountManagementModel.comparePassword({
        id,
        prevPassword,
      });

      if (!result.ok)
        return res.status(400).json({ message: 'Invalid password' });
    } catch (err) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    try {
      const data = await AccountManagementModel.setPassword({
        id,
        password,
      });

      if (data.ok) {
        return res
          .status(200)
          .json({ message: 'Password successfully changed!' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot reset password!' });
    }
  }

  static async newPassword(req, res) {
    const { id } = req.user;
    const { password } = req.body;

    try {
      const result = newPasswordSchema.safeParse({ password });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const data = await AccountManagementModel.getPassword({ id });
      if (!data.ok) {
        return res
          .status(400)
          .json({ message: 'User already has a password!' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'User not logged in!' });
    }

    try {
      const data = await AccountManagementModel.setPassword({
        id,
        password,
      });

      if (data.ok) {
        return res
          .status(200)
          .json({ message: 'Password successfully added!' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot add new password!' });
    }
  }

  static async convertAccount(req, res) {
    const { id } = req.user;

    try {
      const data = await AccountManagementModel.convertAccount({ id });

      if (data.ok) {
        return res
          .status(200)
          .json({ message: 'Account type successfully updated!' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot change account type!' });
    }
  }

  static async deleteAccount(req, res) {
    const { id } = req.user;

    try {
      const data = await AccountManagementModel.deleteAccount({ id });

      if (data.ok) {
        if (data.response) {
          const { avatar } = data.response;
          await deleteCloudinaryFile(avatar);
        }

        return res
          .status(200)
          .json({ message: 'Account successfully deleted!' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot delete user account!' });
    }
  }
}
