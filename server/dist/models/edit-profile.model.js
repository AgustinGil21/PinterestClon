import { pool } from '../dbpool.js';
import { filterFalsyValues } from '../libs/filterFalsyValues.js';
export default class EditProfileModel {
    static async getPublicData({ id }) {
        const response = await pool.query('SELECT username, avatar_background, avatar_letter_color, avatar_letter, name, surname, about_you, website, avatar, birthdate FROM users WHERE id = $1;', [id]);
        const [data] = response.rows;
        const filteredData = filterFalsyValues(data);
        if (response)
            return { response: filteredData, ok: true };
        return { response, ok: false };
    }
    static async editData({ id, username: newUsername, name, surname, about_you, website, birthdate, }) {
        const getPreviousUsername = await pool.query('SELECT username FROM users WHERE id = $1;', [id]);
        const [previousUsername] = getPreviousUsername.rows;
        const { username } = previousUsername;
        if (username !== newUsername) {
            const checkIfUsernameAlreadyExists = await pool.query('SELECT id FROM users WHERE username = $1;', [newUsername]);
            const [user] = checkIfUsernameAlreadyExists.rows;
            if (user) {
                throw new Error('Username already exists, please try to another one!');
            }
        }
        const response = await pool.query('UPDATE users SET name = $1, surname = $2, about_you = $3, website = $4, username = $5, birthdate = $6 WHERE id = $7;', [name, surname, about_you, website, newUsername, birthdate, id]);
        const [data] = response.rows;
        if (response)
            return { response: data, ok: true };
        return { response, ok: false };
    }
}
