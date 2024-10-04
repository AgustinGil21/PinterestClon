import { pool } from '../dbpool.js';
export default class PinsModel {
    static async getPreviousPins({ id }) {
        const response = await pool.query('SELECT body, title, id FROM posts WHERE user_id = $1 GROUP BY id ORDER BY created_at ASC;', [id]);
        const data = response.rows;
        const results = response.rowCount;
        if (data)
            return { response: { data, results }, ok: true };
        return { response, ok: false };
    }
    static async getPreviousPinsFullData({ id }) {
        const response = await pool.query('SELECT id, alt_text, title, body, topics, description, url, adult_content FROM posts WHERE id = $1;', [id]);
        const [data] = response.rows;
        if (data)
            return { response: data, ok: true };
        return { response, ok: false };
    }
    static async getCreatedPins({ username }) {
        const response = await pool.query('SELECT body, title, url, adult_content, alt_text FROM posts WHERE username = $1 GROUP BY id ORDER BY created_at ASC;', [username]);
        const data = response.rows;
        if (data)
            return { response: data, ok: true };
        return { response, ok: false };
    }
    static async pinPreviousValues({ id }) {
        const response = await pool.query('SELECT title, description, url, adult_content, alt_text, topics FROM posts WHERE id = $1', [id]);
        const [previousValues] = response.rows;
        if (response)
            return { response: previousValues, ok: true };
        return { response, ok: false };
    }
    static async deletePin({ pinID, userID }) {
        const response = await pool.query('DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING body;', [pinID, userID]);
        const [data] = response.rows;
        if (data)
            return { response: data, ok: true };
        return { response, ok: false };
    }
    static async createPin({ id, title, description, altText, body, type, topics, adultContent, url, }) {
        const response = await pool.query('INSERT INTO posts(user_id, title, description, body, type_id, topics, url, alt_text, adult_content) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);', [id, title, description, body, type, topics, url, altText, adultContent]);
        const success = response.rowCount;
        if (success)
            return { response, ok: true };
        return { response, ok: true };
    }
    static async editPin({ pinID, title, description, adultContent, url, topics, userID, altText, }) {
        const response = await pool.query('UPDATE posts SET title = $1, description = $2, adult_content = $3, url = $4, topics = $5, alt_text = $6 WHERE id = $7 AND user_id = $8;', [title, description, adultContent, url, topics, altText, pinID, userID]);
        const success = response.rowCount;
        if (success)
            return { response, ok: true };
        return { response, ok: false };
    }
    static async getSinglePin({ id }) {
        const response = await pool.query('SELECT posts.id AS pin_id , body, title, description, url, posts.created_at, alt_text, COUNT(likes.post_id) AS likes, users.name, users.surname, users.avatar, users.avatar_background, users.avatar_letter_color, users.avatar_letter, users.id AS user_id, COUNT(following_accounts.following_id) AS followers FROM posts LEFT JOIN likes ON posts.id = post_id INNER JOIN users ON users.id = posts.user_id LEFT JOIN following_accounts ON following_accounts.following_id = users.id WHERE posts.id = $1 GROUP BY posts.id, users.id;', [id]);
        const [data] = response.rows;
        if (data)
            return { response: data, ok: true };
        return { response, ok: false };
    }
    static async getHomePins({ page, limit }) {
        const offset = (page - 1) * limit;
        const response = await pool.query('SELECT posts.body, posts.title, posts.url, posts.adult_content, posts.id AS pin_id, alt_text, users.name, users.surname, users.username, users.avatar, users.avatar_background, users.avatar_letter_color, users.avatar_letter FROM posts INNER JOIN users ON users.id = user_id ORDER BY posts.id LIMIT $1 OFFSET $2;', [limit, offset]);
        const data = response.rows;
        const results = response.rowCount;
        if (data)
            return { response: { data, results }, ok: true };
        return { response, ok: false };
    }
    static async searchPins({ value, page, limit }) {
        const offset = (page - 1) * limit;
        // const searchValue = `%${value}%`;
        /*'SELECT posts.body, posts.title, posts.url, posts.adult_content, posts.id AS pin_id, alt_text, users.name, users.surname, users.username, users.avatar, users.avatar_background, users.avatar_letter_color, users.avatar_letter FROM posts INNER JOIN users ON users.id = user_id WHERE title ILIKE $1 OR alt_text ILIKE $1 OR description ILIKE $1 ORDER BY posts.id LIMIT $2 OFFSET $3;'*/
        // Esto es para que to_tsquery pueda manejarlo correctamente
        const searchValue = value
            .split(' ')
            .map((term) => `${term}:*`)
            .join(' & ');
        const response = await pool.query(`SELECT posts.body, posts.title, posts.url, posts.adult_content, posts.id AS pin_id, alt_text, users.name, users.surname, users.username, users.avatar, users.avatar_background, users.avatar_letter_color, users.avatar_letter
       FROM posts
       INNER JOIN users ON users.id = posts.user_id
       WHERE to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(alt_text, '') || ' ' || coalesce(description, ''))
             @@ to_tsquery($1)
       ORDER BY posts.id
       LIMIT $2 OFFSET $3;`, [searchValue, limit, offset]);
        const data = response.rows;
        const results = response.rowCount;
        if (data)
            return { response: { data, results }, ok: true };
        return { response, ok: false };
    }
    static async searchByCategory({ category, page, limit }) {
        const offset = (page - 1) * limit;
        // category = UUID
        const response = await pool.query('SELECT posts.body, posts.title, posts.url, posts.adult_content, posts.id AS pin_id, alt_text, users.name, users.surname, users.username, users.avatar, users.avatar_background, users.avatar_letter_color, users.avatar_letter FROM posts INNER JOIN users ON users.id = user_id WHERE $1::UUID = ANY(topics) ORDER BY posts.id LIMIT $2 OFFSET $3;', [category, limit, offset]);
        const data = response.rows;
        const results = response.rowCount;
        if (data)
            return { response: { data, results }, ok: true };
        return { response, ok: false };
    }
    static async searchAutocompleteSuggestions() {
        const response = await pool.query('SELECT title, alt_text FROM posts LIMIT 10000;');
        const data = response.rows;
        if (data)
            return { response: data, ok: true };
        return { response, ok: false };
    }
}
