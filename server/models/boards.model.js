import { pool } from '../dbpool.js';
import { getOffset } from '../libs/getOffset.js';
import { objectsCompare } from '../libs/objectsCompare.js';

export default class BoardsModel {
  // Búsqueda de boards
  static async searchBoards({ value, page, limit, isAuth, userID }) {
    const offset = getOffset({ page, limit });

    const response = await pool.query(
      `
      WITH search_input AS (SELECT $1::text AS search_value)
      SELECT 
          b.id, 
          b.name, 
          b.created_at, 
          (SELECT COUNT(1) FROM board_posts WHERE board_id = b.id) AS pins_count,
          CASE 
          WHEN $4 = TRUE THEN (b.user_id = $5)
          ELSE FALSE 
        END AS its_yours,
          CASE 
            WHEN b.cover IS NOT NULL THEN b.cover
            ELSE NULL
          END AS cover,
          CASE 
            WHEN b.cover IS NULL OR b.cover = '' THEN 
              ARRAY(
                SELECT p.body 
                FROM board_posts bp 
                JOIN posts p ON bp.post_id = p.id 
                WHERE bp.board_id = b.id
                ORDER BY bp.created_at ASC
                LIMIT 3
              )
            ELSE NULL
          END AS collage
      FROM 
          boards b
      CROSS JOIN 
          search_input
      WHERE 
          (
              CASE 
                  WHEN LENGTH(search_value) < 3 THEN 
                      (b.name ILIKE '%' || search_value || '%' 
                      OR b.description ILIKE '%' || search_value || '%')
                  ELSE 
                      (similarity(b.name, search_value) > 0.3 
                      OR similarity(b.description, search_value) > 0.3)
              END
          )
      ORDER BY 
          CASE 
              WHEN LENGTH(search_value) >= 3 THEN GREATEST(
                  similarity(b.name, search_value),
                  similarity(b.description, search_value)
              )
              ELSE 0
          END DESC 
      LIMIT $2 OFFSET $3;
      `,
      [value, limit, offset, isAuth, userID]
    );

    const data = response.rows;
    const results = response.rowCount;

    if (data) return { response: { data, results }, ok: true };
    return { response, ok: false };
  }

  // Listado de pins disponibles para agregar
  // como cover al board
  static async getPossibleCovers({ id, page, limit }) {
    const offset = (page - 1) * limit;

    const response = await pool.query(
      `
      SELECT p.id, p.body
      FROM posts p
      LEFT JOIN board_posts bp ON bp.post_id = p.id
      WHERE bp.board_id = $1
      LIMIT $2 OFFSET $3;
      `,
      [id, limit, offset]
    );

    const data = response.rows;
    const results = response.rowCount;

    if (data) return { response: { data, results }, ok: true };

    return { response, ok: false };
  }

  static async createBoard({ name, description, userID, pinID }) {
    const response = await pool.query(
      'INSERT INTO boards(user_id, name, description) VALUES($1, $2, $3) RETURNING id;',
      [userID, name, description]
    );

    const success = response.rowCount;

    // Preparado para el caso en el que se cree
    // un board desde la modal de crear board
    // que hay al tocar un botón de los pins.
    if (success && pinID) {
      const { id: boardID } = response.rows[0];

      const addPin = await pool.query(
        'INSERT INTO board_posts(board_id, post_id) VALUES($1, $2);',
        [boardID, pinID]
      );

      const success = response.rowCount;

      if (!success) return { addPin, ok: false };
    }

    if (success) return { response, ok: true };
    return { response, ok: false };
  }

  static async getBoardPreviousData({ boardID, userID }) {
    const prevValues = await pool.query(
      `SELECT 
      b.name, 
      b.description, 
      b.cover, 
      p.body AS collage
    FROM boards b
    LEFT JOIN LATERAL (
        SELECT p.body
        FROM board_posts bp
        JOIN posts p ON bp.post_id = p.id
        WHERE bp.board_id = b.id
        ORDER BY bp.created_at ASC
        LIMIT 1
    ) p ON true
    WHERE b.id = $1 AND b.user_id = $2;`,
      [boardID, userID]
    );

    const [prevData] = prevValues.rows;

    if (prevData) return { response: prevData, ok: true };
    return { response, ok: false };
  }

  static async editBoard({ name, description, id, cover }) {
    const boardSkeleton = {
      name: '',
      description: '',
      cover: '',
    };

    const prevValues = await pool.query(
      'SELECT name, description, cover FROM boards WHERE id = $1;',
      [id]
    );

    const [prevData] = prevValues.rows;

    if (!prevData) throw new Error('Cannot get board previous data');

    const newValues = objectsCompare(
      { name, description, cover },
      prevData,
      boardSkeleton
    );

    const response = await pool.query(
      'UPDATE boards SET name = $1, description = $2, cover = $3 WHERE id = $4;',
      [newValues.name, newValues.description, newValues.cover, id]
    );

    const success = response.rowCount;

    if (success) return { response, ok: true };
    return { response, ok: false };
  }

  static async deleteBoard({ id }) {
    const response = await pool.query('DELETE FROM boards WHERE id = $1;', [
      id,
    ]);

    const success = response.rowCount;

    if (success) return { response, ok: true };
    return { response, ok: false };
  }

  static async addPinToBoard({ pinID, boardID }) {
    const checkIfPinAlreadySaved = await pool.query(
      'SELECT EXISTS(SELECT 1 FROM board_posts WHERE board_id = $1 AND post_id = $2) AS already_saved;',
      [boardID, pinID]
    );

    const alreadySaved = checkIfPinAlreadySaved.rows[0].already_saved;

    if (alreadySaved) {
      const deleteRelationship = await pool.query(
        'DELETE FROM board_posts WHERE board_id = $1 AND post_id = $2;',
        [boardID, pinID]
      );

      const deleteSuccess = deleteRelationship.rowCount;

      if (!deleteSuccess) throw new Error('Cannot delete relationship');

      return { response: deleteRelationship, ok: true };
    }

    const response = await pool.query(
      'INSERT INTO board_posts(board_id, post_id) VALUES($1, $2);',
      [boardID, pinID]
    );

    const success = response.rowCount;

    if (success) return { response, ok: true };
    return { response, ok: false };
  }

  static async removePinFromBoard({ pinID, boardID }) {
    const response = await pool.query(
      'DELETE FROM board_posts WHERE board_id = $1 AND post_id = $2',
      [boardID, pinID]
    );

    const success = response.rowCount;

    if (success) return { response, ok: true };
    return { response, ok: false };
  }

  static async getUserBoards({ username, id, isAuth, page, limit }) {
    const offset = getOffset({ page, limit });

    const response = await pool.query(
      `
    SELECT b.id, b.name, b.created_at,
      (SELECT COUNT(1) FROM board_posts WHERE board_id = b.id) AS pins_count,
      CASE 
        WHEN $2 = TRUE THEN (b.user_id = $3)
        ELSE FALSE 
      END AS its_yours,
      CASE
        WHEN b.cover IS NOT NULL THEN b.cover
        ELSE NULL
      END AS cover,
      CASE
        WHEN b.cover IS NULL OR b.cover = '' THEN
          ARRAY(
            SELECT p.body
            FROM board_posts bp
            JOIN posts p ON bp.post_id = p.id
            WHERE bp.board_id = b.id
            ORDER BY bp.created_at ASC
            LIMIT 3
          )
        ELSE NULL
      END AS collage
    FROM boards b
    WHERE b.user_id = (SELECT id FROM users u WHERE u.username = $1)
    ORDER BY b.created_at ASC
    LIMIT $4 OFFSET $5;
      `,
      [username, isAuth, id, limit, offset]
    );

    const data = response.rows;

    if (data) return { response: data, ok: true };
    return { response, ok: false };
  }

  // Home boards
  static async getBoards({ page, limit }) {
    const offset = (page - 1) * limit;

    const response = await pool.query(
      `
    SELECT b.id, b.name, b.created_at, 
      (SELECT COUNT(1) FROM board_posts WHERE board_id = b.id) AS pins_count, u.name, u.surname, u.username, u.id AS user_id
       u.avatar, u.avatar_letter, u.avatar_letter_color, u.avatar_background, u.verified
      CASE 
        WHEN b.cover IS NOT NULL THEN b.cover
        ELSE NULL
      END AS cover,
      CASE 
        WHEN b.cover IS NULL OR b.cover = '' THEN 
          ARRAY(
            SELECT p.body 
            FROM board_posts bp 
            JOIN posts p ON bp.post_id = p.id 
            WHERE bp.board_id = b.id
            ORDER BY bp.created_at ASC
            LIMIT 3
          )
        ELSE NULL
      END AS collage
    FROM boards b
    JOIN users u ON u.id = b.user_id
    LIMIT $1 OFFSET $2;
      `,
      [limit, offset]
    );

    const data = response.rows;
    const results = response.rowCount;

    if (data) return { response: { data, results }, ok: true };

    return { response, ok: false };
  }

  // Muestra un listado de los boards
  // a los cuales el usuario puede agregar
  // un pin específico. Son los boards
  // que aparecen en la modal a la hora de
  // agregar un pin.
  static async getCreatedBoardsList({ id }) {
    const response = await pool.query(
      `
    SELECT
    b.name, 
    b.id,
    CASE 
        WHEN b.cover IS NOT NULL THEN b.cover
        ELSE NULL
    END AS cover,
    CASE 
        WHEN b.cover IS NULL THEN (
            SELECT p.body
            FROM board_posts bp 
            JOIN posts p ON bp.post_id = p.id 
            WHERE bp.board_id = b.id
            ORDER BY bp.created_at ASC
            LIMIT 1
        )
        ELSE NULL
    END AS collage
    FROM boards b
    LEFT JOIN board_posts bp ON b.id = bp.board_id
    WHERE b.user_id = $1
    GROUP BY b.id
    ORDER BY MAX(bp.created_at) DESC, b.created_at ASC;
    `,
      [id]
    );

    const data = response.rows;

    if (data.length > 0) return { response: data, ok: true };
    return { response: [], ok: false };
  }

  // Información que se muestra al tocar en
  // un board. Los pins se van a cargar
  // con un paging.
  static async getSingleBoard({ userID, boardID, page, limit, isAuth }) {
    const offset = getOffset({ page, limit });

    const response = await pool.query(
      `
      SELECT 
        b.id,
        b.name, 
        b.description,
        CASE 
          WHEN $5 = TRUE THEN (u.id = $4)
          ELSE NULL 
        END AS its_yours,
        CASE 
          WHEN $5 = TRUE THEN 
            (CASE 
              WHEN (u.id = $4) THEN NULL 
              ELSE (EXISTS(SELECT 1 FROM following_accounts WHERE follower_id = $4 AND following_id = b.user_id)) 
            END)
          ELSE NULL
        END AS following,
        json_build_object(
          'id', u.id,
          'avatar', u.avatar,
          'avatar_letter', u.avatar_letter,
          'avatar_letter_color', u.avatar_letter_color,
          'avatar_background', u.avatar_background,
          'username', u.username,
          'name', u.name,
          'surname', u.surname
        ) AS user,
        (
            SELECT COUNT(1) 
            FROM board_posts bp 
            WHERE bp.board_id = b.id
        ) AS pins_count,
        (
            SELECT json_agg(
                json_build_object(
                    'body', p.body,
                    'title', p.title,
                    'url', p.url,
                    'adult_content', p.adult_content,
                    'pin_id', p.id,
                    'alt_text', p.alt_text,
                    'name', pu.name,
                    'surname', pu.surname,
                    'username', pu.username,
                    'avatar', pu.avatar,
                    'avatar_background', pu.avatar_background,
                    'avatar_letter_color', pu.avatar_letter_color,
                    'avatar_letter', pu.avatar_letter
                )
            )
            FROM posts p
            INNER JOIN board_posts bp ON p.id = bp.post_id
            INNER JOIN users pu ON pu.id = p.user_id
            WHERE bp.board_id = b.id
            ORDER BY p.id
            LIMIT $1 OFFSET $2
        ) AS pins
      FROM 
        boards b
      LEFT JOIN 
        users u ON u.id = b.user_id  
      WHERE 
        b.id = $3;  
    `,
      [limit, offset, boardID, userID, isAuth]
    );

    const [data] = response.rows;

    if (data) return { response: data, ok: true };
    return { response: data, ok: false };
  }

  static async getLastUsedBoardName({ id }) {
    const response = await pool.query(
      `
      SELECT b.name, b.id 
      FROM boards b
      LEFT JOIN board_posts bp
      ON bp.board_id = b.id
      WHERE b.user_id = $1
      ORDER BY bp.created_at DESC
      LIMIT 1;
      `,
      [id]
    );

    const [data] = response.rows;

    if (data) return { response: data, ok: true };

    return { response, ok: false };
  }
}
