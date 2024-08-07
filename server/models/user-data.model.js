import { pool } from '../dbpool.js';
import { filterFalsyValues } from '../libs/filterFalsyValues.js';

export default class UserDataModel {
  static async getData({ id }) {
    const response = await pool.query(
      'SELECT username, users.id, avatar, email_address, users.name, surname, birthdate, verified, two_factor_authentication, private_account, avatar_background, avatar_letter_color, avatar_letter, website, about_you, created_at, countries.name AS country, genders.name AS gender, account_types.name AS account_type, languages.name AS lang FROM users INNER JOIN countries ON countries.id = users.country_id INNER JOIN genders ON genders.id = users.gender_id INNER JOIN account_types ON account_types.id = users.account_type_id INNER JOIN languages ON languages.id = lang_id  WHERE users.id = $1;',
      [id]
    );

    const [data] = response.rows;
    const filteredData = filterFalsyValues(data);

    if (response) return { response: filteredData, ok: true };

    return { response, ok: false };
  }
}
