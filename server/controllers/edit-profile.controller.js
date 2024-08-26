import { filterFalsyValues } from '../libs/filterFalsyValues.js';
import { objectsCompare } from '../libs/objectsCompare.js';
import EditProfileModel from '../models/edit-profile.model.js';

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

    const objectSkeleton = {
      username: '',
      name: '',
      surname: '',
      about: '',
      website: '',
    };

    const bodyFiltered = filterFalsyValues(req.body);

    try {
      const data = await EditProfileModel.getPublicData({ id });

      if (data.ok) {
        const { response: userData } = data;
        userDataObject = objectsCompare(userData, bodyFiltered, objectSkeleton);
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get user data!' });
    }

    try {
      const { username, name, surname, about, website } = userDataObject;

      const data = await EditProfileModel.editData({
        id,
        username,
        name,
        surname,
        about,
        website,
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
