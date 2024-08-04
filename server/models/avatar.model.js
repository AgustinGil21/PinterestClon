import { pool } from '../dbpool';

export default class AvatarModel {
  static async newAvatar({ id, avatarUrl }) {
    const response = await pool.query(
      'UPDATE users SET avatar = $1 WHERE id = $2;',
      [avatarUrl, id]
    );

    if (response) return { response, ok: true };

    return { response, ok: false };
  }

  static async getAvatar({ id }) {
    const response = await pool.query(
      'SELECT avatar FROM users WHERE id = $1;',
      [id]
    );

    const [data] = response.rows;

    if (response) return { response: data, ok: true };

    return { response, ok: false };
  }

  static async deleteAvatar({ id }) {
    const response = await pool.query(
      'UPDATE users SET avatar = $1 WHERE id = $2;',
      ['', id]
    );

    if (response) return { response: data, ok: true };

    return { response, ok: false };
  }
}
