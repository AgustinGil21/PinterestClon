import { pool } from '../dbpool.js';
import { filterFalsyValues } from '../libs/filterFalsyValues.js';

export default class EditProfileModel {
  static async getData({ id }) {
    const response = await pool.query(
      'SELECT email_address, account_type_id, birthdate, gender_id, lang_id, country_id FROM users WHERE id = $1;',
      [id]
    );

    const [data] = response.rows;
    const filteredData = filterFalsyValues(data);

    if (response) return { response: filteredData, ok: true };
    return { response, ok: false };
  }

  static async editData({
    id,
    username: newUsername,
    name,
    surname,
    about,
    website,
  }) {
    const getPreviousUsername = await pool.query(
      'SELECT username FROM users WHERE id = $1;',
      [id]
    );

    const [previousUsername] = getPreviousUsername.rows;
    const { username } = previousUsername;

    if (username !== newUsername) {
      const checkIfAlreadyExists = await pool.query(
        'SELECT id FROM users WHERE username = $1;',
        [newUsername]
      );

      if (checkIfAlreadyExists) {
        throw new Error('Username already exists, please try to another one!');
      }
    }

    const response = await pool.query(
      'UPDATE users SET name = $1, surname = $2, about_you = $3, website = $4, username = $ 5 WHERE id = $6',
      [name, surname, about, website, newUsername, id]
    );

    const [data] = response.rows;

    if (response) return { response: data, ok: true };

    return { response, ok: false };
  }
}
