import PinsModel from '../models/pins.model.js';
import {
  getSinglePinSchema,
  deletePinSchema,
  getCreatedPinsSchema,
  createPinSchema,
  editPinSchema,
  getHomePinsSchema,
  searchPinsSchema,
  searchByCategorySchema,
} from '../schemas/pins.schema.js';
import { objectsCreator } from '../libs/objectsCreator.js';
import {
  deleteCloudinaryFile,
  uploadFileToCloudinary,
} from '../libs/cloudinary-files.js';
import { detectObjectChanges } from '../libs/detectObjectChanges.js';
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
  topics: [],
};

export default class PinsController {
  static async getPreviousPins(req, res) {
    const { id } = req.user;

    try {
      const data = await PinsModel.getPreviousPins({ id });

      if (data.ok) {
        const { response: pins } = data;
        return res.status(200).json({ pins });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get pins' });
    }
  }

  static async getCreatedPins(req, res) {
    const { username } = req.params;

    try {
      const result = getCreatedPinsSchema.safeParse({ username });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

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

    try {
      const result = createPinSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

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
    const { title, description, url, adultContent, altText, topics } = req.body;
    const { id: pinID } = req.params;
    const { id: userID } = req.user;

    let prevValues;

    try {
      const result = editPinSchema.safeParse({
        id: pinID,
        title,
        description,
        url,
        adultContent,
        altText,
        topics,
      });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const data = await PinsModel.pinPreviousValues({ id: pinID });
      const { response } = data;
      prevValues = response;
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get previous values!' });
    }

    const changes = detectObjectChanges(prevValues, req.body);

    if (!changes)
      return res.status(400).json({ message: 'No changes detected' });

    try {
      const newValues = objectsCompare(
        prevValues,
        { title, description, url, adultContent, altText, topics },
        editPinSkeleton
      );

      const response = await PinsModel.editPin({
        pinID,
        ...newValues,
        userID,
      });

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
      await deleteCloudinaryFile(url);

      return res.status(200).json({ message: 'Pin successfully deleted!' });
    } catch (err) {
      return res.status(400).json({ message: 'Cannot delete pin!' });
    }
  }

  static async getHomePins(req, res) {
    const { page: strPage, limit: strLimit } = req.query;

    const page = Number(strPage);
    const limit = Number(strLimit);

    try {
      const result = getHomePinsSchema.safeParse({ page, limit });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

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
    const { value, page: strPage, limit: strLimit } = req.query;

    const page = Number(strPage);
    const limit = Number(strLimit);

    try {
      const result = searchPinsSchema.safeParse({ page, limit, value });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const data = await PinsModel.searchPins({ value, page, limit });

      if (data.ok) {
        const { data: pins, results } = data.response;
        return res.status(200).json({ pins, results });
      }
    } catch (err) {
      return res.status(404).json({ message: 'Pins not found!' });
    }
  }

  static async searchByCategory(req, res) {
    const { category, page: strPage, limit: strLimit } = req.query;

    const page = Number(strPage);
    const limit = Number(strLimit);

    try {
      const result = searchByCategorySchema.safeParse({
        page,
        limit,
        category,
      });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const data = await PinsModel.searchByCategory({ category, page, limit });
      const { data: pins, results } = data.response;

      if (data.ok) {
        return res.status(200).json({ pins, results });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'Pins not found!' });
    }
  }
}
