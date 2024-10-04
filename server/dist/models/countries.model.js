import { pool } from '../dbpool.js';
export default class CountriesModel {
    static async getCountries() {
        const response = await pool.query('SELECT id, prefix, name FROM countries ORDER BY name ASC;');
        const data = response.rows;
        if (response)
            return { response: data, ok: true };
        return { response, ok: false };
    }
    static async getCountryByID({ id }) {
        const response = await pool.query('SELECT id, prefix, name FROM countries WHERE id = $1;', [id]);
        const [data] = response.rows;
        if (response)
            return { response: data, ok: true };
        return { response, ok: false };
    }
}
