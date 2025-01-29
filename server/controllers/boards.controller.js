import BoardsModel from '../models/boards.model.js';
import {
  filterArrFalsyValues,
  filterFalsyValues,
} from '../libs/filterFalsyValues.js';

export default class BoardsController {
  static async searchBoards(req, res) {
    const { value, page, limit } = req.query;

    try {
      const data = await BoardsModel.searchBoards({ value, page, limit });

      if (data.ok) {
        const { data: boards, results } = data.response;
        const filteredBoards = filterArrFalsyValues(boards);
        return res.status(200).json({ boards: filteredBoards, results });
      }
      return res.status(400).json({ message: 'Cannot get boards!' });
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get boards!' });
    }
  }

  // Trae el nombre del último board al cual
  // el usuario agrego un pin
  static async getLastUsedBoardName(req, res) {
    const { id } = req.user;

    try {
      const data = await BoardsModel.getLastUsedBoardName({ id });

      if (data.ok) {
        const board = data.response;
        return res.status(200).json({ board });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get board name' });
    }
  }

  // Trae la foto de todos los pins que contiene
  // un board para así poder agregar un cover
  // a gusto del usuario
  static async getPossibleCovers(req, res) {
    const { id } = req.params;
    const { page, limit } = req.query;

    try {
      const data = await BoardsModel.getPossibleCovers({ id, page, limit });

      if (data.ok) {
        const { data: pins, results } = data.response;

        return res.status(200).json({ pins, results });
      }
    } catch {
      return res.status(400).json({ message: 'Cannot get possible covers' });
    }
  }

  // Trae todos los boards disponibles
  static async getBoards(req, res) {
    const { page, limit } = req.query;

    try {
      const data = await BoardsModel.getBoards({ page, limit });

      if (data.ok) {
        const { data: boards, results } = data.response;

        const filteredBoards = filterArrFalsyValues(boards);

        return res.status(200).json({ boards: filteredBoards, results });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get boards' });
    }
  }

  static async getSingleBoard(req, res) {
    const { id: boardID } = req.params;
    const { page, limit } = req.query;
    let data;

    try {
      if (req.isAuthenticated) {
        const { id: userID } = req.user;

        data = await BoardsModel.getSingleBoard({
          userID,
          boardID,
          page,
          limit,
          isAuth: true,
        });
      } else {
        data = await BoardsModel.getSingleBoard({
          boardID,
          page,
          limit,
          isAuth: false,
        });
      }

      if (data.ok) {
        const board = data.response;
        const filteredBoard = filterFalsyValues(board);

        return res
          .status(200)
          .json({ board: filteredBoard, isAuthenticated: req.isAuthenticated });
      }
    } catch (err) {
      return res.status(404).json({ message: 'Board not found' });
    }
  }

  // Trae los boards de un al entrar al perfil
  // de un usuario, también funciona con el
  // usuario que esta haciendo la petición
  static async getUserBoards(req, res) {
    const { username } = req.params;
    const { page, limit } = req.query;
    let data;

    try {
      if (req.isAuthenticated) {
        const { id } = req.user;

        data = await BoardsModel.getUserBoards({
          username,
          id,
          isAuth: true,
          page,
          limit,
        });
      } else {
        data = await BoardsModel.getUserBoards({
          username,
          isAuth: false,
          page,
          limit,
        });
      }

      if (data.ok) {
        const filteredData = filterArrFalsyValues(data.response);

        return res.status(200).json({ boards: filteredData });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'Cannot get user’s board' });
    }
  }

  // Trae los boards disponibles a los cuales
  // el usuario puede agregar un pin
  static async getCreatedBoardsList(req, res) {
    const { id } = req.user;

    try {
      const data = await BoardsModel.getCreatedBoardsList({ id });

      if (data.ok) {
        const filteredData = filterArrFalsyValues(data.response);

        return res.status(200).json({ boards: filteredData });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get user’s boards' });
    }
  }

  static async createBoard(req, res) {
    const { id: userID } = req.user;
    const { name, description, pinId: pinID } = req.body;

    try {
      const result = await BoardsModel.createBoard({
        userID,
        name,
        description,
        pinID,
      });

      if (result.ok) {
        return res.status(200).json({ message: 'Board successfully created' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot create board' });
    }
  }

  static async getBoardPreviousData(req, res) {
    const { id: userID } = req.user;
    const { id: boardID } = req.params;

    try {
      const data = await BoardsModel.getBoardPreviousData({
        boardID,
        userID,
      });

      if (data.ok) {
        const boardData = data.response;
        const filteredData = filterFalsyValues(boardData);

        return res.status(200).json({ board: filteredData });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'Could not get board previous data' });
    }
  }

  static async editBoard(req, res) {
    const { name, cover, description, id } = req.body;

    try {
      const result = await BoardsModel.editBoard({
        name,
        description,
        id,
        cover,
      });

      if (result.ok) {
        return res.status(200).json({ message: 'Board successfully edited' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot edit board' });
    }
  }

  static async deleteBoard(req, res) {
    const { id } = req.params;

    try {
      const result = await BoardsModel.deleteBoard({ id });

      if (result.ok) {
        return res.status(200).json({ message: 'Board successfully deleted' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot delete board' });
    }
  }

  static async addPinToBoard(req, res) {
    const { pinId: pinID, boardId: boardID } = req.body;

    try {
      const result = await BoardsModel.addPinToBoard({ pinID, boardID });

      if (result.ok) {
        return res
          .status(200)
          .json({ message: 'Pin successfully added to this board' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot add pin to this board' });
    }
  }

  static async removePinFromBoard(req, res) {
    const { pinId: pinID, boardId: boardID } = req.body;

    try {
      const result = await BoardsModel.removePinFromBoard({ pinID, boardID });

      if (result.ok) {
        return res
          .status(200)
          .json({ message: 'Pin successfully removed from this board' });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'Cannot remove pin from this board' });
    }
  }
}
