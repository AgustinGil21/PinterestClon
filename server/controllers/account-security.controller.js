import AccountSecurityModel from '../models/account-security.model.js';

export default class AccountSecurityController {
  static async toggleTwoFactorAuthenticationMode(req, res) {
    const { id } = req.user;

    try {
      const data = await AccountSecurityModel.toggleTwoFactorAuthenticationMode(
        { id }
      );

      if (data.ok) {
        return res
          .status(200)
          .json({ message: 'Account security successfully updated!' });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'Cannot update account security!' });
    }
  }

  static async getData(req, res) {
    const { id } = req.user;

    try {
      const data = await AccountSecurityModel.getData({ id });

      if (data.ok) {
        const userData = data.response;
        res.status(200).json({ userData });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get user data!' });
    }
  }
}
