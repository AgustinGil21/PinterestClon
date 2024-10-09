import { pool } from '../dbpool.js';
import { IdParams } from '../interfaces/classes/basics/basic-models&controllers-interface.js';
import { ISearchCategoryByName } from '../interfaces/classes/models/categories-model-interface.js';

export default class CategoriesModel {
  static async getCategories() {
    const response = await pool.query(
      'SELECT name, id, poster FROM categories;'
    );

    const data = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  static async searchCategoryByName({ value }: ISearchCategoryByName) {
    const searchValue = `%${value}%`;

    const response = await pool.query(
      'SELECT name, id, poster FROM categories WHERE name ILIKE $1 ORDER BY name ASC;',
      [searchValue]
    );

    const data = response.rows;
    const results = response.rowCount;

    if (data) return { response: { data, results }, ok: true };
    return { response, ok: false };
  }

  static async searchByID({ id }: IdParams) {
    const response = await pool.query(
      'SELECT name, id, poster FROM categories WHERE id = $1;',
      [id]
    );

    const [data] = response.rows;
    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }
}
