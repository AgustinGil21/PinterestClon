import { pool } from '../dbpool.js';
export default class AccountSecurityModel {
    static async getData({ id }) {
        const response = await pool.query('SELECT two_factor_authentication FROM users WHERE users.id = $1;', [id]);
        if (response) {
            const [userData] = response.rows;
            return { response: userData, ok: true };
        }
        return { response, ok: false };
    }
    static async toggleTwoFactorAuthenticationMode({ id }) {
        let twoFactorAuthentication;
        const previousValue = await pool.query('SELECT two_factor_authentication FROM users WHERE id = $1;', [id]);
        const [dbValue] = previousValue.rows;
        const { two_factor_authentication: dbTwoFactorAuthentication } = dbValue;
        if (dbTwoFactorAuthentication) {
            twoFactorAuthentication = false;
        }
        else {
            twoFactorAuthentication = true;
        }
        const response = await pool.query('UPDATE users SET two_factor_authentication = $1 WHERE id = $2;', [twoFactorAuthentication, id]);
        if (response)
            return { response, ok: true };
        return { response, ok: false };
    }
}
