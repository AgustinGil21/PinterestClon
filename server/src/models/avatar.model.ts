import { pool } from '../dbpool.js';
import { IdParams } from '../interfaces/classes/basics/basic-models&controllers-interface.js';
import { INewAvatar } from '../interfaces/classes/models/avatar-model-interface.js';

export default class AvatarModel {
  static async newAvatar({ id, avatarUrl }: INewAvatar) {
    const response = await pool.query(
      'UPDATE users SET avatar = $1 WHERE id = $2;',
      [avatarUrl, id]
    );

    if (response) return { response, ok: true };

    return { response, ok: false };
  }

  static async getAvatar({ id }: IdParams) {
    const response = await pool.query(
      'SELECT avatar FROM users WHERE id = $1;',
      [id]
    );

    const [data] = response.rows;

    if (response) return { response: data, ok: true };

    return { response, ok: false };
  }

  static async deleteAvatar({ id }: IdParams) {
    const response = await pool.query(
      'UPDATE users SET avatar = $1 WHERE id = $2 RETURNING avatar;',
      ['', id]
    );

    const [data] = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }
}
