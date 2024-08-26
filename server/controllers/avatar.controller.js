import AvatarModel from '../models/avatar.model.js';
import {
  uploadFileToCloudinary,
  destroyCloudinaryFile,
} from '../libs/cloudinary-files.js';
import { getCloudinaryPublicId } from '../libs/get-cloudinary-publicId.js';

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
      const getAvatarUrl = await AvatarModel.getAvatar({ id });

      if (getAvatarUrl.ok) {
        const { avatar } = getAvatarUrl.response;
        const publicId = getCloudinaryPublicId(avatar);
        await destroyCloudinaryFile(publicId);
      }
    } catch (err) {
      return res.status(400).json({ message: 'User avatar does not exist!' });
    }

    try {
      const response = await AvatarModel.deleteAvatar({ id });

      if (response.ok) {
        return res
          .status(200)
          .json({ message: 'User avatar successfully deleted!' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot delete user avatar!' });
    }
  }
}
