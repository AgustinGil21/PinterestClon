import { pool } from '../dbpool.js';

export default class BoardsModel {
  static async searchBoards({ value, page, limit }) {
    const offset = (page - 1) * limit;
    const searchValue = value
      .split(' ')
      .map((term) => `${term}:*`)
      .join(' & ');

    // TODO: Terminar la query
    const response = await pool.query(
      `SELECT created_at, boards.id AS board_id, name, board_cover AS cover
       FROM boards
       WHERE to_tsvector('simple', coalesce(name, '')) @@ to_tsquery($1)
       ORDER BY boards.id
       LIMIT $2 OFFSET $3;`,
      [searchValue, limit, offset]
    );

    const data = response.rows;
    const results = response.rowCount;

    if (data) return { response: { data, results }, ok: true };
    return { response, ok: false };
  }
}
