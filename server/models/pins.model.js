import { pool } from '../dbpool.js';
import { getOffset } from '../libs/getOffset.js';

export default class PinsModel {
  // Trae los pines creados en anterioridad
  // por el usuario, para hacer una vista
  // previa de estos.
  static async getPreviousPins({ id }) {
    const response = await pool.query(
      'SELECT body, title, id, created_at FROM posts WHERE user_id = $1 GROUP BY id ORDER BY created_at ASC;',
      [id]
    );

    const data = response.rows;
    const results = response.rowCount;

    if (data) return { response: { data, results }, ok: true };
    return { response, ok: false };
  }

  // Trae todos los datos de un pin para obtener
  // los valores previos del mismo a la hora de
  // editarlo
  static async getPreviousPinsFullData({ id }) {
    const response = await pool.query(
      'SELECT id, alt_text, title, body, topics, description, url, adult_content FROM posts WHERE id = $1;',
      [id]
    );

    const [data] = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  static async getCreatedPins({ username, isAuth, userID = '', page, limit }) {
    const offset = getOffset({ page, limit });

    const response = await pool.query(
      `SELECT 
        body, 
        title, 
        url, 
        adult_content, 
        alt_text, 
        id, 
        created_at,
        CASE 
          WHEN $1 = TRUE THEN 
            CASE 
              WHEN user_id = $2 THEN TRUE 
              ELSE FALSE 
            END 
          ELSE NULL 
        END AS its_yours
      FROM posts 
      WHERE user_id = (SELECT id FROM users WHERE username = $3) 
      ORDER BY created_at ASC
      LIMIT $4 OFFSET $5
      ;`,
      [isAuth, userID, username, limit, offset]
    );

    const data = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  // Trae los valores previos de un pin en concreto
  // para ser usados en la edición de pines.
  static async pinPreviousValues({ id }) {
    const response = await pool.query(
      'SELECT title, description, url, adult_content, alt_text, topics FROM posts WHERE id = $1',
      [id]
    );

    const [previousValues] = response.rows;

    if (response) return { response: previousValues, ok: true };

    return { response, ok: false };
  }

  static async deletePin({ pinID }) {
    const response = await pool.query(
      'SELECT delete_post_and_update_boards($1) AS body;',
      [pinID]
    );

    const [data] = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  static async createPin({
    id,
    title,
    description,
    altText,
    body,
    type,
    topics,
    adultContent,
    url,
  }) {
    const response = await pool.query(
      'INSERT INTO posts(user_id, title, description, body, type_id, topics, url, alt_text, adult_content) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);',
      [id, title, description, body, type, topics, url, altText, adultContent]
    );
    const success = response.rowCount;

    if (success) return { response, ok: true };
    return { response, ok: true };
  }

  static async editPin({
    pinID,
    title,
    description,
    adultContent,
    url,
    topics,
    userID,
    altText,
  }) {
    const response = await pool.query(
      'UPDATE posts SET title = $1, description = $2, adult_content = $3, url = $4, topics = $5, alt_text = $6 WHERE id = $7 AND user_id = $8;',
      [title, description, adultContent, url, topics, altText, pinID, userID]
    );

    const success = response.rowCount;

    if (success) return { response, ok: true };
    return { response, ok: false };
  }

  // Trae un pin con cierta información modificada
  // dependiendo de si el usuario quiere acceder
  // a un pin propio o si quiere acceder al de otra
  // persona, si ese es el caso, podrá hacerlo tanto
  // logueado como deslogueado. Esto hará que la
  // información que devuelva sea diferente.

  static async getSinglePin({ pinID, userID }) {
    const response = await pool.query(
      `
    SELECT 
    p.id, 
    p.title, 
    p.description, 
    p.topics, 
    p.body, 
    p.url, 
    p.alt_text,
    (SELECT COUNT(1) FROM likes WHERE post_id = p.id) AS likes,
    (SELECT EXISTS(SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $2)) AS already_liked,
    (SELECT COUNT(1) FROM comments WHERE post_id = p.id) AS comments,
    u.username,
    u.id AS user_id, 
    u.name, 
    u.surname, 
    u.avatar, 
    u.avatar_background,
    u.avatar_letter_color, 
    u.avatar_letter, 
    u.verified,
    (u.id = $2) AS its_you,
    (CASE 
        WHEN (u.id = $2) THEN NULL 
        ELSE (SELECT EXISTS(SELECT 1 FROM following_accounts WHERE follower_id = u.id AND following_id = $2)) 
     END) AS follows_you,
    (CASE 
        WHEN (u.id = $2) THEN NULL 
        ELSE (SELECT EXISTS(SELECT 1 FROM following_accounts WHERE following_id = u.id AND follower_id = $2)) 
     END) AS following,
    (SELECT COUNT(1) FROM following_accounts WHERE following_id = u.id) AS followers
FROM 
    posts AS p
JOIN 
    users AS u ON p.user_id = u.id
WHERE 
    p.id = $1;

  `,
      [pinID, userID]
    );

    const [data] = response.rows;

    console.log(data);

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  static async getSinglePinNotLogged({ pinID }) {
    const response = await pool.query(
      `SELECT p.id, p.title, p.description, p.topics, p.body, p.url, p.alt_text,
        (SELECT COUNT(1) FROM likes WHERE post_id = p.id) AS likes,
        (SELECT COUNT(1) FROM comments WHERE post_id = p.id) AS comments,
        u.username, u.name, u.surname, u.avatar, u.avatar_background,
        u.avatar_letter_color, u.avatar_letter, u.verified,
        NULL AS its_you, 
        NULL AS follows_you, 
        NULL AS following, 
        (SELECT COUNT(1) FROM following_accounts WHERE following_id = u.id) AS followers
      FROM posts AS p
      JOIN users AS u ON p.user_id = u.id
      WHERE p.id = $1;
    `,
      [pinID]
    );

    const [data] = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  // Al entrar a la vista de un pin, debajo
  // aparecerán pins similares a la publicación
  // actual.
  static async youMightAlsoLike({ pinID, page, limit }) {
    const offset = getOffset({ limit, page });

    const response = await pool.query(
      `
  WITH current_pin AS (
        SELECT 
            title AS search_title, 
            description AS search_description, 
            alt_text AS search_alt_text, 
            topics AS search_topics
        FROM posts
        WHERE id = $1
    )
    SELECT 
        posts.body, 
        posts.title, 
        posts.url, 
        posts.adult_content, 
        posts.id AS pin_id, 
        posts.alt_text,
        users.id AS user_id,
        users.name, 
        users.surname, 
        users.username, 
        users.avatar, 
        users.avatar_background, 
        users.avatar_letter_color, 
        users.avatar_letter,
        GREATEST(
            CASE WHEN posts.topics && current_pin.search_topics THEN 1 ELSE 0 END, 
            similarity(posts.title, current_pin.search_title),
            similarity(posts.description, current_pin.search_description),
            similarity(posts.alt_text, current_pin.search_alt_text)
        ) AS similarity_score
    FROM posts
    INNER JOIN users ON users.id = posts.user_id
    CROSS JOIN current_pin
    WHERE posts.id != $1
    AND (
        posts.topics && current_pin.search_topics
        OR similarity(posts.title, current_pin.search_title) > 0.1 
        OR similarity(posts.description, current_pin.search_description) > 0.1
        OR similarity(posts.alt_text, current_pin.search_alt_text) > 0.1
    )
    ORDER BY similarity_score DESC
    LIMIT $2 OFFSET $3;
      `,
      [pinID, limit, offset]
    );

    const pins = response.rows;
    const results = response.rowCount;

    if (pins) return { response: { pins, results }, ok: true };
    return { response, ok: false };
  }

  static async toggleLikePin({ pinID, userID }) {
    let response;

    const checkHasLikedPin = await pool.query(
      'SELECT EXISTS(SELECT 1 FROM likes WHERE post_id = $1 AND user_id = $2) as has_liked;',
      [pinID, userID]
    );

    const hasLiked = checkHasLikedPin.rows[0].has_liked;

    if (hasLiked) {
      response = await pool.query(
        'DELETE FROM likes WHERE post_id = $1 AND user_id = $2 RETURNING 1;',
        [pinID, userID]
      );
    } else {
      response = await pool.query(
        'INSERT INTO likes (post_id, user_id) VALUES($1, $2) RETURNING 1;',
        [pinID, userID]
      );
    }

    if (response.rowCount) return { response, ok: true };
    return { response, ok: false };
  }

  // Pins de la home page
  static async getHomePins({ page, limit }) {
    const offset = (page - 1) * limit;

    const response = await pool.query(
      'SELECT posts.body, posts.title, posts.url, posts.adult_content, posts.id AS pin_id, alt_text, users.name, users.surname, users.username, users.avatar, users.avatar_background, users.avatar_letter_color, users.avatar_letter FROM posts INNER JOIN users ON users.id = user_id ORDER BY posts.id LIMIT $1 OFFSET $2;',
      [limit, offset]
    );

    const data = response.rows;
    const results = response.rowCount;

    if (data) return { response: { data, results }, ok: true };
    return { response, ok: false };
  }

  // Busca pins por el valor que se le es
  // asignado por el usuario, si el valor
  // tiene una longitud menor a 3, usará
  // un sistema mas eficiente para esos casos,
  // de lo contrario, buscará por nivel de
  // similitud.
  static async searchPins({ value, page, limit }) {
    const offset = (page - 1) * limit;

    const response = await pool.query(
      `
      WITH search_input AS (SELECT $1::text AS search_value)
  SELECT posts.body, posts.title, posts.url, posts.adult_content, posts.id AS pin_id, alt_text, users.name, users.surname, users.username, users.avatar, users.avatar_background, users.avatar_letter_color, users.avatar_letter 
  FROM posts 
  INNER JOIN users ON users.id = posts.user_id
  CROSS JOIN search_input
  WHERE 
  (
      CASE 
          WHEN LENGTH(search_value) < 3 THEN 
              (posts.title ILIKE '%' || search_value || '%'
              OR posts.description ILIKE '%' || search_value || '%'
              OR posts.alt_text ILIKE '%' || search_value || '%')
          ELSE 
              (similarity(posts.title, search_value) > 0.3 
              OR similarity(posts.description, search_value) > 0.3 
              OR similarity(posts.alt_text, search_value) > 0.3)
      END
  )
  ORDER BY 
      CASE 
          WHEN LENGTH(search_value) >= 3 THEN GREATEST(
              similarity(posts.title, search_value),
              similarity(posts.description, search_value),
              similarity(posts.alt_text, search_value)
          )
          ELSE 0
      END DESC 
  LIMIT $2 OFFSET $3`,
      [value, limit, offset]
    );

    const data = response.rows;
    const results = response.rowCount;

    if (data) return { response: { data, results }, ok: true };
    return { response, ok: false };
  }

  // Busca pines por categoría.
  static async searchByCategory({ category, page, limit }) {
    const offset = (page - 1) * limit;

    const response = await pool.query(
      'SELECT posts.body, posts.title, posts.url, posts.adult_content, posts.id AS pin_id, alt_text, users.name, users.surname, users.username, users.avatar, users.avatar_background, users.avatar_letter_color, users.avatar_letter FROM posts INNER JOIN users ON users.id = user_id WHERE $1::UUID = ANY(topics) ORDER BY posts.id LIMIT $2 OFFSET $3;',
      [category, limit, offset]
    );

    const data = response.rows;
    const results = response.rowCount;

    if (data) return { response: { data, results }, ok: true };
    return { response, ok: false };
  }

  // TODO: Moverlo
  // Devuelve las sugerencias de búsqueda,
  // tanto pins como usuarios.
  static async searchAutocompleteSuggestions() {
    const response = await pool.query(
      '(SELECT title AS pin_title, alt_text AS pin_alt_text, NULL AS user_name, NULL AS user_surname, NULL AS user_username, NULL AS user_avatar, NULL AS user_verified, NULL AS user_avatar_background, NULL AS user_avatar_letter, NULL AS user_avatar_letter_color, NULL AS board_name FROM posts) UNION ALL (SELECT NULL AS pin_title, NULL AS pin_alt_text, name AS user_name, surname AS user_surname, username AS user_username, avatar AS user_avatar, verified AS user_verified, avatar_background AS user_avatar_background, avatar_letter AS user_avatar_letter, avatar_letter_color AS user_avatar_letter_color, NULL AS board_name FROM users);'
    );

    const data = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }
}
