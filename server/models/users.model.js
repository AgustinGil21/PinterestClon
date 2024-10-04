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

  static async getUserById({ id }) {
    const response = await pool.query(
      'SELECT username, about_you AS about, website, users.name, surname, verified, avatar, avatar_background, avatar_letter_color, avatar_letter, (SELECT COUNT(follower_id) FROM following_accounts WHERE following_id = $1) AS followers, (SELECT COUNT(following_id) FROM following_accounts WHERE follower_id = $1) AS following FROM users WHERE id = $1;',
      [id]
    );

    const data = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  static async getUserByUsernameAndId({ username, id }) {
    const response = await pool.query(
      `SELECT
      id,
      username, 
      about_you AS about,
      website,
      users.name, 
      surname, 
      verified, 
      avatar, 
      avatar_background, 
      avatar_letter_color, 
      avatar_letter,
      (SELECT COUNT(follower_id) FROM following_accounts WHERE following_id = (SELECT id FROM users WHERE username = $1)) AS followers,
      (SELECT COUNT(following_id) FROM following_accounts WHERE follower_id = (SELECT id FROM users WHERE username = $1)) AS following,
      (SELECT EXISTS(SELECT 1 FROM following_accounts WHERE follower_id = (SELECT id FROM users WHERE username = $1) AND following_id = $2)) AS follows_you,
      (SELECT EXISTS(SELECT 1 FROM following_accounts WHERE following_id = (SELECT id FROM users WHERE username = $1) AND follower_id = $2)) AS following
   FROM 
      users 
   WHERE 
      username = $1;`,
      [username, id]
    );

    const data = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  static async getUserByUsername({ username }) {
    const response = await pool.query(
      `SELECT
      username, 
      about_you AS about,
      website,
      users.name, 
      surname, 
      verified, 
      avatar, 
      avatar_background, 
      avatar_letter_color, 
      avatar_letter,
      (SELECT COUNT(follower_id) FROM following_accounts WHERE following_id = (SELECT id FROM users WHERE username = $1)) AS followers,
      (SELECT COUNT(following_id) FROM following_accounts WHERE follower_id = (SELECT id FROM users WHERE username = $1)) AS following
   FROM 
      users 
   WHERE 
      username = $1;`,
      [username]
    );

    const data = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }
}
