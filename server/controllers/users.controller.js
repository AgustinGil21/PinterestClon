import {
  filterArrFalsyValues,
  filterFalsyValues,
} from '../libs/filterFalsyValues.js';
import UsersModel from '../models/users.model.js';

export default class UsersController {
  static async searchUsers(req, res) {
    const { value, page: strPage, limit: strLimit } = req.query;

    const page = Number(strPage);
    const limit = Number(strLimit);

    try {
      const data = await UsersModel.searchUsers({ value, page, limit });

      if (data.ok) {
        const { data: users, results } = data.response;
        return res.status(200).json({ users, results });
      }
      return res.status(400).json({ message: 'Cannot get users!' });
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get users!' });
    }
  }

  static async getUserOwnerProfile(req, res) {
    const { id } = req.user;

    try {
      const data = await UsersModel.getUserById({ id });

      if (data.ok) {
        const [user] = data.response;
        const filteredData = filterFalsyValues(user);
        return res.status(200).json({ profile: filteredData });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get user data!' });
    }
  }

  static async getUserProfile(req, res) {
    const { username } = req.params;
    let data;

    try {
      if (!req.isAuthenticated) {
        data = await UsersModel.getUserByUsername({ username });
      } else {
        const { id } = req.user;

        data = await UsersModel.getUserByUsernameAndId({
          username,
          id,
        });
      }

      if (data.ok) {
        const [user] = data.response;
        const filteredData = filterFalsyValues(user);
        return res.status(200).json({ profile: filteredData });
      }
    } catch (err) {
      return res.status(404).json({ message: 'User not found!' });
    }
  }

  // Listado de personas que siguen al
  // usuario solicitado
  static async userFollowers(req, res) {
    const { username } = req.params;
    let data;

    try {
      if (!req.isAuthenticated) {
        data = await UsersModel.userFollowersNotLogged({ username });
      } else {
        const { id } = req.user;
        data = await UsersModel.userFollowers({ username, id });
      }

      if (data.ok) {
        const { followers, followersCount } = data.response;
        const filteredFollowers = filterArrFalsyValues(followers);
        return res
          .status(200)
          .json({ followers: filteredFollowers, followersCount });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Could not get user followers!' });
    }
  }

  // Listado de personas a las que sigue
  // el usuario solicitado
  static async userFollowingAccounts(req, res) {
    const { username } = req.params;
    let data;

    try {
      if (!req.isAuthenticated) {
        data = await UsersModel.userFollowingAccountsNotLogged({
          username,
        });
      } else {
        const { id } = req.user;
        data = await UsersModel.userFollowingAccounts({ username, id });
      }

      if (data.ok) {
        const { following, followingCount } = data.response;
        const filteredFollowings = filterArrFalsyValues(following);
        return res
          .status(200)
          .json({ following: filteredFollowings, followingCount });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'Could not get user following accounts!' });
    }
  }

  static async toggleFollowUser(req, res) {
    const { id: ownerID } = req.user;
    const { id: userID } = req.params;

    try {
      const successfully = await UsersModel.toggleFollowUser({
        ownerID,
        userID,
      });

      if (successfully.ok) {
        return res
          .status(200)
          .json({ message: 'Operation successfully completed!' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Unexpected error!' });
    }
  }
}
