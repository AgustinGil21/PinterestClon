import { pool } from '../dbpool.js';
import { IdParams } from '../interfaces/classes/basics/basic-models&controllers-interface.js';
import {
  ComparePasswordsParams,
  EditDataParams,
  SetPasswordParams,
} from '../interfaces/classes/models/account-management-model-interface.js';
import { Crypt, CryptCompare } from '../libs/crypt.js';

export default class AccountManagementModel {
  static async getData({ id }: IdParams) {
    const response = await pool.query(
      'SELECT email_address, birthdate, genders.name AS gender, countries.name AS country, languages.name AS language, account_types.name AS account_type  FROM users INNER JOIN genders ON genders.id = gender_id INNER JOIN countries ON countries.id = country_id INNER JOIN languages ON languages.id = lang_id INNER JOIN account_types ON account_types.id = account_type_id WHERE users.id = $1; ',
      [id]
    );

    if (response) {
      const [userData] = response.rows;
      return { response: userData, ok: true };
    }
    return { response, ok: false };
  }

  static async getInfoData({ id }: IdParams) {
    const response = await pool.query(
      'SELECT email_address, birthdate, gender_id AS gender, country_id AS country, lang_id AS language FROM users WHERE id = $1; ',
      [id]
    );

    if (response) {
      const [userDataDB] = response.rows;
      const {
        email_address: emailAddress,
        birthdate,
        gender,
        country,
        language,
      } = userDataDB;
      const userData = { emailAddress, birthdate, gender, country, language };

      return { response: userData, ok: true };
    }
    return { response, ok: false };
  }

  static async editData({
    id,
    emailAddress: newEmailAddress,
    birthdate,
    gender,
    country,
    language,
  }: EditDataParams) {
    const getPreviousEmailAddress = await pool.query(
      'SELECT email_address FROM users WHERE id = $1;',
      [id]
    );

    const [previousEmailAddress] = getPreviousEmailAddress.rows;
    const { email_address: emailAddress } = previousEmailAddress;

    if (newEmailAddress !== emailAddress) {
      const checkIfUsernameAlreadyExists = await pool.query(
        'SELECT id FROM users WHERE email_address = $1;',
        [newEmailAddress]
      );

      if (checkIfUsernameAlreadyExists.rowCount) {
        throw new Error(
          'Email address already exists, please try to another one!'
        );
      }
    }

    const response = await pool.query(
      'UPDATE users SET email_address = $1, birthdate = $2, gender_id = $3, country_id = $4, lang_id = $5 WHERE id = $6;',
      [newEmailAddress, birthdate, gender, country, language, id]
    );

    const [data] = response.rows;

    if (response) return { response: data, ok: true };

    return { response, ok: false };
  }

  static async convertAccount({ id }: IdParams) {
    let accountType;

    const previousType = await pool.query(
      'SELECT account_type_id FROM users WHERE id = $1;',
      [id]
    );

    const [dbAccountTypeArr] = previousType.rows;
    const { account_type_id: dbAccountType } = dbAccountTypeArr;

    if (dbAccountType === 1) {
      accountType = 2;
    } else {
      accountType = 1;
    }

    const response = await pool.query(
      'UPDATE users SET account_type_id = $1 WHERE id = $2;',
      [accountType, id]
    );

    if (response) return { response, ok: true };

    return { response, ok: false };
  }

  static async comparePassword({ id, prevPassword }: ComparePasswordsParams) {
    const response = await pool.query(
      'SELECT password FROM users WHERE id = $1;',
      [id]
    );

    const [dbPassword] = response.rows;
    const { password } = dbPassword;

    const comparePassword = await CryptCompare(prevPassword, password);

    if (comparePassword) return { response, ok: true };
    return { response, ok: false };
  }

  static async setPassword({ id, password }: SetPasswordParams) {
    const encryptedPassword = await Crypt(password);

    const response = await pool.query(
      'UPDATE users SET password = $1 WHERE id = $2;',
      [encryptedPassword, id]
    );

    if (response) return { response, ok: true };
    return { response, ok: false };
  }

  static async getPassword({ id }: IdParams) {
    const response = await pool.query(
      'SELECT password FROM users WHERE id = $1;',
      [id]
    );

    if (!response.rowCount) return { response, ok: true };
    return { response, ok: false };
  }

  static async deleteAccount({ id }: IdParams) {
    const response = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING avatar;',
      [id]
    );

    const [data] = response.rows;

    if (response) return { response: data, ok: true };

    return { response, ok: false };
  }
}
