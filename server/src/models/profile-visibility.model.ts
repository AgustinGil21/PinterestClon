import { pool } from '../dbpool.js';
import { IdParams } from '../interfaces/classes/basics/basic-models&controllers-interface.js';

export default class ProfileVisibilityModel {
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

  static async privateAccount({ id }: IdParams) {
    let privateAccount;

    const previousValue = await pool.query(
      'SELECT private_account FROM users WHERE id = $1;',
      [id]
    );

    const [dbUserPrivacy] = previousValue.rows;
    const { private_account: dbPrivateAccount } = dbUserPrivacy;

    if (dbPrivateAccount) {
      privateAccount = false;
    } else {
      privateAccount = true;
    }

    const response = await pool.query(
      'UPDATE users SET private_account = $1 WHERE id = $2;',
      [privateAccount, id]
    );

    if (response) return { response, ok: true };

    return { response, ok: false };
  }

  static async getData({ id }: IdParams) {
    const response = await pool.query(
      'SELECT account_types.name AS account_type, private_account FROM users INNER JOIN account_types ON account_types.id = account_type_id WHERE users.id = $1;',
      [id]
    );

    if (response) {
      const [userData] = response.rows;
      return { response: userData, ok: true };
    }
    return { response, ok: false };
  }
}
