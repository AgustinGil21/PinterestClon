import { pool } from '../dbpool.js';
import { IdParams } from '../interfaces/classes/basics/basic-models&controllers-interface.js';

export default class CountriesModel {
  static async getGenders() {
    const response = await pool.query(
      'SELECT id, name FROM genders ORDER BY name ASC;'
    );

    const data = response.rows;

    if (response) return { response: data, ok: true };
    return { response, ok: false };
  }

  static async getGenderByID({ id }: IdParams) {
    const response = await pool.query(
      'SELECT id, name FROM genders WHERE id = $1;',
      [id]
    );

    const [data] = response.rows;

    if (response) return { response: data, ok: true };
    return { response, ok: false };
  }
}
