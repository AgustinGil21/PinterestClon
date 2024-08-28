import PinsModel from '../models/pins.model.js';
import { getSinglePinSchema, deletePinSchema } from '../schemas/pins.schema.js';
import { objectsCreator } from '../libs/objectsCreator.js';
import {
  destroyCloudinaryFile,
  uploadFileToCloudinary,
} from '../libs/cloudinary-files.js';
import { getCloudinaryPublicId } from '../libs/get-cloudinary-publicId.js';
import { objectsCompare } from '../libs/objectsCompare.js';

const createPinSkeleton = {
  body: '',
  title: '',
  description: '',
  url: '',
  type: 1,
  topics: [],
  altText: '',
  adultContent: false,
};

const editPinSkeleton = {
  title: '',
  description: '',
  url: '',
  adultContent: false,
  altText: '',
};

export default class PinsController {
  static async getCreatedPins(req, res) {
    const { username } = req.params;

    try {
      const data = await PinsModel.getCreatedPins({ username });

      if (data.ok) {
        const { response: pins } = data;

        return res.status(200).json({ pins });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Error' });
    }
  }

  static async createPin(req, res) {
    const { id } = req.user;
    let body;

    // try {
    // } catch (err) {
    //   return res.status(500).json({ message: 'Internal error!' });
    // }

    if (req.files?.body) {
      const result = await uploadFileToCloudinary(req.files.body.tempFilePath);

      body = result.secure_url;
    }

    try {
      const data = objectsCreator({ ...req.body, body }, createPinSkeleton);
      const response = await PinsModel.createPin({ ...data, id });

      if (response.ok) {
        return res.status(200).json({ message: 'Pin successfully created!' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot create pin!' });
    }
  }

  static async editPin(req, res) {
    const { id, title, description, url, adultContent, altText } = req.body;
    let prevValues;

    try {
      const data = await PinsModel.pinPreviousValues({ id });
      const { response } = data;
      prevValues = response;
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get previous values!' });
    }

    try {
      const newValues = objectsCompare(
        prevValues,
        { title, description, url, adultContent, altText },
        editPinSkeleton
      );

      const response = await PinsModel.editPin({ id, ...newValues });

      if (response.ok) {
        return res.status(200).json({ message: 'Pin successfully edited!' });
      }
      return res.status(400).json({ message: 'Cannot edit pin!' });
    } catch (err) {
      return res.status(400).json({ message: 'Cannot edit pin!' });
    }
  }

  static async getSinglePin(req, res) {
    const { id } = req.params;

    try {
      const result = getSinglePinSchema.safeParse({ id });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const data = await PinsModel.getSinglePin({ id });

      if (data.ok) {
        const { response: pin } = data;
        return res.status(200).json({ pin });
      }
      return res.status(404).json({ message: 'Pin not found!' });
    } catch (err) {
      return res.status(404).json({ message: 'Pin not found!' });
    }
  }

  static async deletePin(req, res) {
    const { id: userID } = req.user;
    const { id: pinID } = req.params;

    try {
      const result = deletePinSchema.safeParse({ pinID });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const data = await PinsModel.deletePin({ pinID, userID });
      const { body: url } = data.response;
      const publicId = getCloudinaryPublicId(url);
      await destroyCloudinaryFile(publicId);

      return res.status(200).json({ message: 'Pin successfully deleted!' });
    } catch (err) {
      return res.status(400).json({ message: 'Cannot delete pin!' });
    }
  }

  static async getHomePins(req, res) {
    const { page, limit } = req.query;

    try {
      const data = await PinsModel.getHomePins({ page, limit });

      if (data.ok) {
        const { data: pins, results } = data.response;

        return res.status(200).json({ pins, results });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Error' });
    }
  }

  static async searchPins(req, res) {
    const { value, page, limit } = req.query;

    try {
      const data = await PinsModel.searchPins({ value, page, limit });

      if (data.ok) {
      }
    } catch (err) {
      return res.status(400).json({ message: 'Pins not found!' });
    }
  }

  static async;
}
