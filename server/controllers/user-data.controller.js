import UserDataModel from '../models/user-data.model.js';

export default class UserDataController {
  static async getData(req, res) {
    const { id } = req.user;
    const { access_token } = req.cookies;
    console.log(access_token);

    try {
      const data = await UserDataModel.getData({ id });

      if (data.ok) {
        const { response: userData } = data;
        return res.status(200).json({ userData });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get user data!' });
    }
  }
}
