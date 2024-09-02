import { filterFalsyValues } from '../libs/filterFalsyValues.js';
import { objectsCompare } from '../libs/objectsCompare.js';
import EditProfileModel from '../models/edit-profile.model.js';
import { dateNow } from '../libs/date.js';
import { editProfileSchema } from '../schemas/edit-profile.schema.js';
import { detectObjectChanges } from '../libs/detectObjectChanges.js';

export default class EditProfileController {
  static async getPublicData(req, res) {
    const { id } = req.user;

    try {
      const data = await EditProfileModel.getPublicData({ id });

      if (data.ok) {
        const { response: userData } = data;

        return res.status(200).json({ userData });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get user data!' });
    }
  }

  static async changePublicData(req, res) {
    const { id } = req.user;
    let userDataObject = {};

    // try {
    //   const result = editProfileSchema.safeParse(req.body);

    //   if (!result.success) {
    //     return res.status(400).json({ issues: result.error.issues });
    //   }
    // } catch (err) {
    //   return res.status(500).json({ message: 'Internal error!' });
    // }

    const objectSkeleton = {
      username: '',
      name: '',
      surname: '',
      about_you: '',
      website: '',
      birthdate: dateNow,
    };

    try {
      const data = await EditProfileModel.getPublicData({ id });

      if (data.ok) {
        const { response: userData } = data;

        const anyChanges = detectObjectChanges(userData, req.body);

        if (!anyChanges)
          return res.status(400).json({ message: 'No changes detected' });

        userDataObject = objectsCompare(userData, req.body, objectSkeleton);
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get user data!' });
    }

    try {
      const { username, name, surname, about_you, website, birthdate } =
        userDataObject;

      const data = await EditProfileModel.editData({
        id,
        username,
        name,
        surname,
        about_you,
        website,
        birthdate,
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
}
