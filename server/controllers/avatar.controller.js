import AvatarModel from '../models/avatar.model.js';
import {
  uploadFileToCloudinary,
  deleteCloudinaryFile,
} from '../libs/cloudinary-files.js';

export default class AvatarController {
  static async newAvatar(req, res) {
    const { id } = req.user;

    const avatar = await uploadFileToCloudinary(req.files.avatar.tempFilePath);
    const avatarUrl = avatar.secure_url;

    try {
      const response = await AvatarModel.newAvatar({ id, avatarUrl });

      if (response.ok) {
        return res
          .status(200)
          .json({ message: 'User avatar successfully uploaded!' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot upload user avatar' });
    }
  }

  static async deleteAvatar(req, res) {
    const { id } = req.user;

    try {
      const data = await AvatarModel.deleteAvatar({ id });

      if (data.ok) {
        const { avatar } = data.response;
        await deleteCloudinaryFile(avatar);

        return res
          .status(200)
          .json({ message: 'User avatar successfully deleted!' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot delete user avatar!' });
    }
  }
}
