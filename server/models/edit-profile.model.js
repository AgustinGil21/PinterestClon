import { pool } from '../dbpool.js';

export default class EditProfileModel {
  static async getPublicData({ id }) {
    const response = await pool.query(
      'SELECT username FROM users WHERE id = $1;',
      [id]
    );

    const [data] = response.rows;
    console.log(data);
  }

  static async avatar({ avatarURL }) {}

  static async changePublicData({}) {}
}
