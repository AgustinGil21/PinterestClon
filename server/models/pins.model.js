import { pool } from '../dbpool.js';

export default class PinsModel {
  static async getCreatedPins({ id }) {
    const response = await pool.query(
      'SELECT body, title, url, adult_content FROM posts WHERE id = $1 GROUP BY id ORDER BY created_at ASC;',
      [id]
    );

    const data = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  static async editPin({ userId, pinId }) {
    const response = await pool.query('', []);
  }

  static async getSinglePin({ id }) {
    const response = await pool.query(
      'SELECT body, title, description, url, type_id AS pin_type, created_at, topics, COUNT(likes.post_id) AS likes FROM posts LEFT JOIN likes ON id = post_id WHERE id = $1;',
      [id]
    );

    const data = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }
}
