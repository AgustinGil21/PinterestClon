import AvatarModel from '../models/avatar.model.js';
import cloudinary from '../utils/cloudinary.js';
import { optimizeImg } from '../libs/optimize-image.js';

export default class AvatarController {
  static async newAvatar(req, res) {
    const { id } = req.user;

    // const fileName = req.file.filename.split('.')[0];
    // const filePath = req.file.path;

    // const optimizedImg = optimizeImg({
    //   filePath,
    //   fileName,
    //   width: 128,
    //   height: 128,
    // });
    // console.log(optimizedImg);

    const avatarResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload({}, (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
        .end(req.file.path);
    });

    const avatarUrl = avatarResponse.secure_url;

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
        const { response: avatar } = getAvatarUrl;
        const splitUrl = avatar.split('/');
        const name = splitUrl[splitUrl.length - 1];
        const [public_id] = name.split('.');

        await cloudinary.uploader.destroy(public_id);
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
