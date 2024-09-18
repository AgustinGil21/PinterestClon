import BoardsModel from '../models/boards.model.js';

export default class BoardsController {
  static async searchBoards(req, res) {
    const { value, page: strPage, limit: strLimit } = req.query;

    const page = Number(strPage);
    const limit = Number(strLimit);

    try {
      const data = await BoardsModel.searchBoards({ value, page, limit });

      if (data.ok) {
        const { data: boards, results } = data.response;
        return res.status(200).json({ pins: boards, results });
      }
      return res.status(400).json({ message: 'Cannot get boards!' });
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get boards!' });
    }
  }
}
