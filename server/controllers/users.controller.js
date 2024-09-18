import UsersModel from '../models/users.model.js';

export default class UsersController {
  static async searchUsers(req, res) {
    const { value, page: strPage, limit: strLimit } = req.query;

    const page = Number(strPage);
    const limit = Number(strLimit);

    try {
      const data = await UsersModel.searchUsers({ value, page, limit });
      const { data: users, results } = data.response;

      if (data.ok) {
        return res.status(200).json({ users, results });
      }
      return res.status(400).json({ message: 'Cannot get users!' });
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get users!' });
    }
  }
}
