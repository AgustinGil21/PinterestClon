import { pool } from '../dbpool.js';
export default class LanguagesModel {
    static async getLanguages() {
        const response = await pool.query('SELECT id, name, abbreviation FROM languages ORDER BY name ASC;');
        const data = response.rows;
        if (response)
            return { response: data, ok: true };
        return { response, ok: false };
    }
    static async getLanguageByID({ id }) {
        const response = await pool.query('SELECT id, name, abbreviation FROM languages WHERE id = $1;', [id]);
        const [data] = response.rows;
        if (response)
            return { response: data, ok: true };
        return { response, ok: false };
    }
}
