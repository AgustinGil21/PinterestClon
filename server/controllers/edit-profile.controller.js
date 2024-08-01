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
      console.log(err);
      return res.status(400).json({ message: 'Cannot get user data!' });
    }
  }

  static async avatar(req, res) {}

  static async changePublicData(req, res) {}
}
