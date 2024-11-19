import { pool } from '../dbpool.js';

export default class UsersModel {
  static async searchUsers({ value, page, limit }) {
    const offset = (page - 1) * limit;

    const searchValue = value
      .split(' ')
      .map((term) => `${term}:*`)
      .join(' & ');

    const response = await pool.query(
      `SELECT name, surname, users.id AS user_id, username, avatar, verified, avatar_background, avatar_letter_color, avatar_letter
      FROM users
      WHERE to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(surname, '') || ' ' || coalesce(username, ''))
      @@ to_tsquery($1)
      ORDER BY users.id
      LIMIT $2 OFFSET $3;`,
      [searchValue, limit, offset]
    );

    const data = response.rows;
    const results = response.rowCount;

    if (data) return { response: { data, results }, ok: true };
    return { response, ok: false };
  }

  //
  static async getUserById({ id }) {
    const response = await pool.query(
      'SELECT username, about_you AS about, website, users.name, surname, verified, avatar, avatar_background, avatar_letter_color, avatar_letter, (SELECT COUNT(follower_id) FROM following_accounts WHERE following_id = $1) AS followers, (SELECT COUNT(following_id) FROM following_accounts WHERE follower_id = $1) AS following FROM users WHERE id = $1;',
      [id]
    );

    const data = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  // Muestra la información de un perfil cuando
  // el usuario que lo solicita esta logueado.
  static async getUserByUsernameAndId({ username, id }) {
    const response = await pool.query(
      `SELECT
      id,
      username, 
      about_you AS about,
      website,
      users.name, 
      surname, 
      verified, 
      avatar, 
      avatar_background, 
      avatar_letter_color, 
      avatar_letter,
      users.created_at
      (SELECT COUNT(follower_id) FROM following_accounts WHERE following_id = (SELECT id FROM users WHERE username = $1)) AS followers_count,
      (SELECT COUNT(following_id) FROM following_accounts WHERE follower_id = (SELECT id FROM users WHERE username = $1)) AS following_count,
      (SELECT EXISTS(SELECT 1 FROM following_accounts WHERE follower_id = (SELECT id FROM users WHERE username = $1) AND following_id = $2)) AS follows_you,
      (SELECT EXISTS(SELECT 1 FROM following_accounts WHERE following_id = (SELECT id FROM users WHERE username = $1) AND follower_id = $2)) AS following,
      (users.id = $2) AS its_you
   FROM 
      users
   WHERE
      username = $1;`,
      [username, id]
    );

    const data = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  // Muestra la información de un perfil cuando
  // el usuario que lo solicita no esta logueado.
  static async getUserByUsername({ username }) {
    const response = await pool.query(
      `SELECT
      username, 
      about_you AS about,
      website,
      users.name, 
      surname, 
      verified, 
      avatar, 
      avatar_background, 
      avatar_letter_color, 
      avatar_letter,
      users.created_at
      (SELECT COUNT(1) FROM following_accounts WHERE following_id = (SELECT id FROM users WHERE username = $1)) AS followers,
      (SELECT COUNT(1) FROM following_accounts WHERE follower_id = (SELECT id FROM users WHERE username = $1)) AS following
   FROM 
      users 
   WHERE 
      username = $1;`,
      [username]
    );

    const data = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  // Trae los seguidores de un usuario
  static async userFollowers({ username, id }) {
    const response = await pool.query(
      `SELECT
    u.id, 
    u.username, 
    u.avatar, 
    u.name, 
    u.surname, 
    u.verified, 
    u.avatar_letter_color, 
    u.avatar_letter, 
    u.avatar_background,

    (CASE 
      WHEN (u.id = $1) THEN NULL 
      ELSE (SELECT EXISTS(SELECT 1 FROM following_accounts WHERE follower_id = u.id AND following_id = $1)) 
    END) AS follows_you,
    
    (CASE 
      WHEN (u.id = $1) THEN NULL 
      ELSE (SELECT EXISTS(SELECT 1 FROM following_accounts WHERE following_id = u.id AND follower_id = $1)) 
    END) AS following,

    (u.id = $1) AS its_you
FROM 
    users u
INNER JOIN 
    following_accounts fa 
    ON fa.follower_id = u.id
WHERE 
    fa.following_id = (SELECT id FROM users WHERE username = $2)
ORDER BY
    its_you DESC,
    fa.created_at DESC;
    `,
      [id, username]
    );

    const users = response.rows;
    const usersCount = response.rowCount;

    if (response) {
      return {
        response: { followers: users, followersCount: usersCount },
        ok: true,
      };
    }

    return { response, ok: false };
  }

  // Trae los seguidores de un usuario, pero
  // cuando quien los solicita no esta logueado
  static async userFollowersNotLogged({ username }) {
    const response = await pool.query(
      `SELECT
    u.username, 
    u.avatar, 
    u.name, 
    u.surname, 
    u.verified, 
    u.avatar_letter_color, 
    u.avatar_letter, 
    u.avatar_background
FROM 
    users u
INNER JOIN 
    following_accounts fa 
    ON fa.follower_id = u.id
WHERE 
    fa.following_id = (SELECT id FROM users WHERE username = $1)
ORDER BY
    fa.created_at DESC;
    `,
      [username]
    );

    const users = response.rows;
    const usersCount = response.rowCount;

    if (response) {
      return {
        response: { followers: users, followersCount: usersCount },
        ok: true,
      };
    }

    return { response, ok: false };
  }

  // Trae los seguidos de un usuario
  static async userFollowingAccounts({ username, id }) {
    const response = await pool.query(
      `SELECT
    u.id, 
    u.username, 
    u.avatar, 
    u.name, 
    u.surname, 
    u.verified, 
    u.avatar_letter_color, 
    u.avatar_letter, 
    u.avatar_background,

    (
      CASE 
        WHEN (u.id = $1) THEN NULL 
        ELSE (SELECT EXISTS(SELECT 1 FROM following_accounts WHERE follower_id = u.id AND following_id = $1)) 
      END
    ) AS follows_you,

    (
      CASE 
        WHEN (u.id = $1) THEN NULL 
        ELSE (SELECT EXISTS(SELECT 1 FROM following_accounts WHERE following_id = u.id AND follower_id = $1)) 
      END
    ) AS following,

    (u.id = $1) AS its_you
FROM 
    users u
INNER JOIN 
    following_accounts fa 
    ON fa.following_id = u.id
WHERE 
    fa.follower_id = (SELECT id FROM users WHERE username = $2)
ORDER BY
    its_you DESC,
    fa.created_at DESC;
    `,
      [id, username]
    );

    const users = response.rows;
    const usersCount = response.rowCount;

    if (response) {
      return {
        response: { following: users, followingCount: usersCount },
        ok: true,
      };
    }

    return { response, ok: false };
  }

  // Trae los seguidos de un usuario, pero
  // cuando quien los solicita no esta logueado
  static async userFollowingAccountsNotLogged({ username }) {
    const response = await pool.query(
      `SELECT
    u.username, 
    u.avatar, 
    u.name, 
    u.surname, 
    u.verified, 
    u.avatar_letter_color, 
    u.avatar_letter, 
    u.avatar_background
FROM 
    users u
INNER JOIN 
    following_accounts fa 
    ON fa.following_id = u.id
WHERE 
    fa.follower_id = (SELECT id FROM users WHERE username = $1)
ORDER BY
    fa.created_at DESC;
    `,
      [username]
    );

    const users = response.rows;
    const usersCount = response.rowCount;

    if (response) {
      return {
        response: { following: users, followingCount: usersCount },
        ok: true,
      };
    }

    return { response, ok: false };
  }

  // Verifica si el usuario que lo solicita
  // sigue a cierta persona, si lo hace, lo
  // deja de seguir, de lo contrario, lo
  // empezará a seguir
  static async toggleFollowUser({ userID, ownerID }) {
    let response;

    const checkAlreadyFollowing = await pool.query(
      'SELECT EXISTS(SELECT 1 FROM following_accounts WHERE follower_id = $1 AND following_id = $2) as is_following;',
      [ownerID, userID]
    );

    const isFollowing = checkAlreadyFollowing.rows[0].is_following;

    if (isFollowing) {
      response = await pool.query(
        'DELETE FROM following_accounts WHERE follower_id = $1 AND following_id = $2 RETURNING 1;',
        [ownerID, userID]
      );
    } else {
      response = await pool.query(
        'INSERT INTO following_accounts(following_id, follower_id) VALUES($1, $2) RETURNING 1;',
        [userID, ownerID]
      );
    }

    if (response.rowCount) return { response, ok: true };
    return { response, ok: false };
  }
}
