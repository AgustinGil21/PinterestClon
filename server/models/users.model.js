import { pool } from '../dbpool.js';

export default class UsersModel {
  static async searchUsers({ value, page, limit }) {
    const offset = (page - 1) * limit;

    const searchValue = value
      .split(' ')
      .map((term) => `${term}:*`)
      .join(' & ');

    const response = await pool.query(
      `SELECT name, surname, users.id AS user_id, username, avatar, verified, avatar_background, avatar_letter_color, avatar_letter
      FROM users
      WHERE to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(surname, '') || ' ' || coalesce(username, ''))
      @@ to_tsquery($1)
      ORDER BY users.id
      LIMIT $2 OFFSET $3;`,
      [searchValue, limit, offset]
    );

    const data = response.rows;
    const results = response.rowCount;

    if (data) return { response: { data, results }, ok: true };
    return { response, ok: false };
  }
}
