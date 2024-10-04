import { pool } from '../dbpool.js';
import { filterFalsyValues } from '../libs/filterFalsyValues.js';
export default class UserHomeDataModel {
    static async getData({ id }) {
        const response = await pool.query('SELECT username, email_address, users.name, surname, verified, avatar, avatar_background, avatar_letter_color, avatar_letter ,account_types.name AS account_type FROM users INNER JOIN account_types ON account_types.id = account_type_id WHERE users.id = $1;', [id]);
        const [data] = response.rows;
        const filteredData = filterFalsyValues(data);
        if (response)
            return { response: filteredData, ok: true };
        return { response, ok: false };
    }
    static async getFollowersAndFollowingCount({ id }) {
        const response = await pool.query('SELECT (SELECT COUNT(follower_id) FROM following_accounts WHERE following_id = $1) AS followers,(SELECT COUNT(following_id) FROM following_accounts WHERE follower_id = $1) AS following;', [id]);
        const [data] = response.rows;
        if (response)
            return { response: data, ok: true };
        return { response, ok: false };
    }
}
