import { Crypt, CryptCompare } from '../libs/crypt.js';
import { dateNow as createdAt } from '../libs/date.js';
import { pool } from '../dbpool.js';

export default class AuthModel {
  static async register({
    emailAddress,
    password,
    username,
    birthdate,
    genderId,
    langId,
    countryId,
    avatarBackground,
    avatarLetterColor,
    avatarLetter,
  }) {
    const alreadyExists = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email_address = $2;',
      [username, emailAddress]
    );

    if (alreadyExists.rowCount) throw new Error('User already exists!');

    const encryptedPassword = await Crypt(password);

    const response = await pool.query(
      'INSERT INTO users(username, email_address, password, country_id, lang_id, birthdate, gender_id, created_at, avatar_background, avatar_letter, avatar_letter_color) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id;',
      [
        username,
        emailAddress,
        encryptedPassword,
        countryId,
        langId,
        birthdate,
        genderId,
        createdAt,
        avatarBackground,
        avatarLetter,
        avatarLetterColor,
      ]
    );

    const [data] = response.rows;

    if (response) return { response: data, ok: true };

    return { response, ok: false };
  }

  static async logIn({ emailAddress, password }) {
    const getUserPassword = await pool.query(
      'SELECT password FROM users WHERE email_address = $1;',
      [emailAddress]
    );

    if (!getUserPassword.rowCount) throw new Error('Invalid credentials');

    const [user] = getUserPassword.rows;
    const { password: dbUserPassword } = user;

    const validUserPassword = await CryptCompare(password, dbUserPassword);
    if (!validUserPassword) throw new Error('Invalid user password!');

    const response = await pool.query(
      'SELECT id FROM users WHERE email_address = $1;',
      [emailAddress]
    );

    const [data] = response.rows;

    if (response) return { response: data, ok: true };

    return { response, ok: false };
  }

  static async recoverAccount({ emailAddress }) {
    const response = await pool.query(
      'SELECT id FROM users WHERE email_address = $1;',
      [emailAddress]
    );

    const [data] = response.rows;

    if (response) return { response: data, ok: true };

    return { response, ok: false };
  }

  static async resetPassword({ password, emailAddress }) {
    const encryptedPassword = await Crypt(password);

    const response = pool.query(
      'UPDATE users SET password = $1 WHERE email_address = $2;',
      [encryptedPassword, emailAddress]
    );

    if (!response) return { response, ok: false };

    return { response, ok: true };
  }
}
