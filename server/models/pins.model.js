import { pool } from '../dbpool.js';

export default class PinsModel {
  static async getCreatedPins({ username }) {
    const response = await pool.query(
      'SELECT body, title, url, adult_content FROM posts WHERE username = $1 GROUP BY id ORDER BY created_at ASC;',
      [username]
    );

    const data = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  static async pinPreviousValues({ id }) {
    const response = await pool.query(
      'SELECT title, description, url, adult_content, alt_text FROM posts WHERE id = $1',
      [id]
    );

    const [previousValues] = response.rows;

    if (response) return { response: previousValues, ok: true };

    return { response, ok: false };
  }

  static async deletePin({ pinID, userID }) {
    const response = await pool.query(
      'DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING body;',
      [pinID, userID]
    );

    const [data] = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  static async createPin({
    id,
    title,
    description,
    altText,
    body,
    type,
    topics,
    adultContent,
    url,
  }) {
    const response = await pool.query(
      'INSERT INTO posts(user_id, title, description, body, type_id, topics, url, alt_text, adult_content) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);',
      [id, title, description, body, type, topics, url, altText, adultContent]
    );
    const success = response.rowCount;

    if (success) return { response, ok: true };
    return { response, ok: true };
  }

  static async editPin({ id, title, description, adultContent, url }) {
    const response = await pool.query(
      'UPDATE posts SET title = $1, description = $2, adult_content = $3, url = $4 WHERE id = $5;',
      [title, description, adultContent, url, id]
    );

    const success = response.rowCount;

    if (success) return { response, ok: true };
    return { response, ok: false };
  }

  static async getSinglePin({ id }) {
    const response = await pool.query(
      'SELECT posts.id AS pin_id , body, title, description, url, type_id AS pin_type, posts.created_at, topics,alt_text, COUNT(likes.post_id) AS likes, users.name, users.surname, users.avatar, users.avatar_background, users.avatar_letter_color, users.avatar_letter, users.id AS user_id, COUNT(following_accounts.following_id) AS followers FROM posts LEFT JOIN likes ON posts.id = post_id INNER JOIN users ON users.id = posts.user_id LEFT JOIN following_accounts ON following_accounts.following_id = users.id WHERE posts.id = $1 GROUP BY posts.id, users.id;',
      [id]
    );

    const [data] = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  static async getHomePins({ page, limit }) {
    const offset = (page - 1) * limit;

    const response = await pool.query(
      'SELECT posts.body, posts.title, posts.url, posts.adult_content, posts.id AS pin_id ,users.name, users.surname, users.username, users.avatar, users.avatar_background, users.avatar_letter_color, users.avatar_letter FROM posts INNER JOIN users ON users.id = user_id ORDER BY posts.id LIMIT $1 OFFSET $2;',
      [limit, offset]
    );

    const data = response.rows;
    const results = response.rowCount;

    if (data) return { response: { data, results }, ok: true };
    return { response, ok: false };
  }
}
