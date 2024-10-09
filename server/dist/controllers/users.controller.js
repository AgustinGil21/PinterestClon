import { filterFalsyValues } from '../libs/filterFalsyValues.js';
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
        }
        catch (err) {
            return res.status(400).json({ message: 'Cannot get users!' });
        }
    }
    static async getUserById(req, res) {
        const { id } = req.user;
        try {
            const data = await UsersModel.getUserById({ id });
            if (data.ok) {
                const [user] = data.response;
                const filteredData = filterFalsyValues(user);
                return res.status(200).json({ profile: filteredData });
            }
        }
        catch (err) {
            return res.status(400).json({ message: 'Cannot get user data!' });
        }
    }
    static async getUserByUsernameAndId(req, res) {
        const { id } = req.user;
        const { username } = req.params;
        try {
            const data = await UsersModel.getUserByUsernameAndId({
                username,
                id,
            });
            if (data.ok) {
                const [user] = data.response;
                const filteredData = filterFalsyValues(user);
                return res.status(200).json({ profile: filteredData });
            }
        }
        catch (err) {
            return res.status(404).json({ message: 'User not found!' });
        }
    }
    static async getUserByUsername(req, res) {
        const { username } = req.params;
        try {
            const data = await UsersModel.getUserByUsername({
                username,
            });
            if (data.ok) {
                const [user] = data.response;
                const filteredData = filterFalsyValues(user);
                return res.status(200).json({ profile: filteredData });
            }
        }
        catch (err) {
            return res.status(404).json({ message: 'User not found!' });
        }
    }
}
