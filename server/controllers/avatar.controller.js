import { v2 as cloudinary } from 'cloudinary';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from '../config.js';
import AvatarModel from '../models/avatar.model.js';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export default class AvatarController {
  static async newAvatar(req, res) {
    const { id } = req.user;
    const data = await req.formData();
    const avatar = data.get('avatar');

    if (!avatar) {
      return res.status(400).json({ message: 'Avatar is required!' });
    }

    const bytes = await avatar.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const avatarResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
        .end(buffer);
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
      return res.status(400).json({ message: 'User avatar does not exists!' });
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
