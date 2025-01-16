import { filterArrFalsyValues } from '../libs/filterFalsyValues.js';
import CommentsModel from '../models/comments.model.js';

export default class CommentsController {
  static async createComment(req, res) {
    const { id: userID } = req.user;
    const { id: pinID, content } = req.body;

    try {
      const success = await CommentsModel.createComment({
        userID,
        pinID,
        content,
      });

      if (success.ok) {
        return res
          .status(201)
          .json({ message: 'Comment successfully created' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Could not create comment' });
    }
  }

  static async deleteComment(req, res) {
    const { id: userID } = req.user;
    const { id: commentID } = req.params;

    try {
      const success = await CommentsModel.deleteComment({ commentID, userID });

      console.log(success);
      if (success.ok) {
        return res
          .status(200)
          .json({ message: 'Comment successfully deleted' });
      }

      return res.status(400).json({ message: 'Could not delete comment' });
    } catch (err) {
      return res.status(400).json({ message: 'Could not delete comment' });
    }
  }

  static async toggleLikeComment(req, res) {
    const { id: userID } = req.user;
    const { id: commentID } = req.body;

    try {
      const success = await CommentsModel.toggleLikeComment({
        userID,
        commentID,
      });

      if (success.ok) {
        return res
          .status(200)
          .json({ message: 'Success liking/disliking pin' });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'Could not complete the process' });
    }
  }

  static async getPinComments(req, res) {
    const { id: pinID } = req.params;
    const { page, limit } = req.query;

    let data;

    try {
      if (req.isAuthenticated) {
        const { id: userID } = req.user;
        data = await CommentsModel.getPinComments({
          page,
          limit,
          pinID,
          userID,
          isAuth: true,
        });
      } else {
        data = await CommentsModel.getPinComments({
          page,
          limit,
          pinID,
          isAuth: false,
        });
      }

      if (data.ok) {
        const filteredData = filterArrFalsyValues(data.response.data);

        return res.status(200).json({ comments: filteredData });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Could not get pin comments' });
    }
  }
}
