import { pool } from '../dbpool.js';
import { getOffset } from '../libs/getOffset.js';

export default class CommentsModel {
  static async createComment({ pinID, userID, content }) {
    const response = await pool.query(
      `
      INSERT INTO comments(post_id, user_id, content) VALUES ($1, $2, $3);
      `,
      [pinID, userID, content]
    );

    const success = response.rowCount;

    if (success) return { response, ok: true };
    return { response, ok: false };
  }

  static async deleteComment({ id }) {
    const response = await pool.query('DELETE FROM comments WHERE id = $1;', [
      id,
    ]);

    const success = response.rowCount;

    if (success) return { response, ok: true };
    return { response, ok: false };
  }

  static async toggleLikeComment({ commentID, userID }) {
    // Verifica si el comentario ya ha sido
    // marcado con "like" por el usuario
    const checkIfCommentAlreadyLiked = await pool.query(
      'SELECT EXISTS(SELECT 1 FROM comment_likes WHERE comment_id = $1 AND user_id = $2) AS already_liked;',
      [commentID, userID]
    );

    const alreadyLiked = checkIfCommentAlreadyLiked.rows[0].already_liked;

    // Si ya tiene "like", se elimina
    if (alreadyLiked) {
      const unlikeMsg = await pool.query(
        'DELETE FROM comment_likes WHERE comment_id = $1 AND user_id = $2;',
        [commentID, userID]
      );

      const unlikeSuccess = unlikeMsg.rowCount;

      if (!unlikeSuccess) throw new Error('Cannot unlike comment');
    }

    // Si no tiene "like", se añade
    const response = await pool.query(
      'INSERT INTO comment_likes(comment_id, user_id) VALUES($1, $2);',
      [commentID, userID]
    );

    const success = response.rowCount;

    if (success) return { response, ok: true };
    return { response, ok: false };
  }

  // Trae todos los comentarios de un pin
  static async getPinComments({ userID = '', pinID, page, limit, isAuth }) {
    const offset = getOffset({ limit, page });

    const response = await pool.query(
      `
      SELECT 
            c.id, 
            c.content, 
            c.created_at,
            u.name, 
            u.surname, 
            u.username, 
            u.avatar, 
            u.avatar_letter, 
            u.avatar_letter_color, 
            u.avatar_background, 
            u.id AS user_id,
            (SELECT COUNT(1) FROM comment_likes WHERE comment_id = c.id) AS likes_count,
          CASE WHEN $5 = TRUE THEN
            EXISTS(SELECT 1 FROM comment_likes WHERE comment_id = c.id AND user_id = $1) 
          ELSE NULL
          END AS already_liked,
          CASE WHEN (c.user_id = $1) THEN TRUE
          ELSE FALSE
          END AS its_yours
        FROM 
            comments c
        LEFT JOIN 
            users u ON u.id = c.user_id
        WHERE 
            c.post_id = $2
        ORDER BY 
            c.created_at ASC
        LIMIT $3 OFFSET $4;

      `,
      [userID, pinID, limit, offset, isAuth]
    );

    const data = response.rows;
    const results = response.rowCount;

    if (data) return { response: { data, results }, ok: true };

    return { response, ok: false };
  }
}
