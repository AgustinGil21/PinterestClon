import ProfileVisibilityModel from '../models/profile-visibility.model.js';
export default class ProfileVisibilityController {
    static async convertAccount(req, res) {
        const { id } = req.user;
        try {
            const data = await ProfileVisibilityModel.convertAccount({ id });
            if (data.ok) {
                return res
                    .status(200)
                    .json({ message: 'Account type successfully updated!' });
            }
        }
        catch (err) {
            return res.status(400).json({ message: 'Cannot change account type!' });
        }
    }
    static async privateProfile(req, res) {
        const { id } = req.user;
        try {
            const data = await ProfileVisibilityModel.privateAccount({ id });
            if (data.ok) {
                return res
                    .status(200)
                    .json({ message: 'Account privacy successfully updated!' });
            }
        }
        catch (err) {
            return res
                .status(400)
                .json({ message: 'Cannot change account privacy!' });
        }
    }
    static async getData(req, res) {
        const { id } = req.user;
        try {
            const data = await ProfileVisibilityModel.getData({ id });
            if (data.ok) {
                const userData = data.response;
                return res.status(200).json({ userData });
            }
        }
        catch (err) {
            return res.status(400).json({ message: 'Cannot get user data!' });
        }
    }
}
