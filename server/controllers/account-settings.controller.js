import EditProfileModel from '../models/account-settings.model.js';

export default class AccountSettingsController {
  static async getData(req, res) {
    const { id } = req.user;

    try {
      const data = await EditProfileModel.getData({ id });

      if (data.ok) {
        const { response: userData } = data;

        return res.status(200).json({ userData });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'Cannot get user data!' });
    }
  }

  static async editData(req, res) {
    const { name, surname, username, about, website } = req.boy;
    const { id } = req.user;

    try {
      // Validación de datos
    } catch (err) {}

    try {
      const data = await EditProfileModel.editData({
        id,
        name,
        surname,
        username,
        about,
        website,
      });

      if (data.ok) {
        return res
          .status(200)
          .json({ message: 'User profile successfully edited!' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot edit user profile' });
    }
  }
}
