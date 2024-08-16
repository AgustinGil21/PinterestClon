import UserHomeDataModel from '../models/user-home-data.model.js';

export default class UserDataController {
  static async getData(req, res) {
    const { id } = req.user;

    try {
      const data = await UserHomeDataModel.getData({ id });

      if (data.ok) {
        const { response: userData } = data;
        return res.status(200).json({ userData });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'Cannot get user data!' });
    }
  }
}
