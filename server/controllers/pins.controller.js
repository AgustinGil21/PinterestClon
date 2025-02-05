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
import {
  filterArrFalsyValues,
  filterFalsyValues,
} from '../libs/filterFalsyValues.js';

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

  static async getPreviousPinsFullData(req, res) {
    const { id } = req.params;

    try {
      const data = await PinsModel.getPreviousPinsFullData({ id });

      if (data.ok) {
        const { response: pin } = data;
        const filteredData = filterFalsyValues(pin);
        return res.status(200).json({ pin: filteredData });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get pins' });
    }
  }

  static async getCreatedPins(req, res) {
    const { username } = req.params;
    const { page, limit } = req.query;

    // try {
    //   const result = getCreatedPinsSchema.safeParse({ username });

    //   if (!result.success) {
    //     return res.status(400).json({ issues: result.error.issues });
    //   }
    // } catch (err) {
    //   return res.status(500).json({ message: 'Internal error!' });
    // }

    try {
      let data;

      if (req.isAuthenticated) {
        data = await PinsModel.getCreatedPins({
          username,
          userID: req.user.id,
          isAuth: true,
          page,
          limit,
        });
      } else {
        data = await PinsModel.getCreatedPins({
          username,
          isAuth: false,
          page,
          limit,
        });
      }

      if (data.ok) {
        const { response: pins } = data;

        return res.status(200).json({ pins });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Error fetching created pins' });
    }
  }

  static async getSavedPins(req, res) {
    const { username } = req.params;
    const { page, limit } = req.query;

    try {
      let data;

      if (req.isAuthenticated) {
        data = await PinsModel.getSavedPins({
          username,
          userID: req.user.id,
          isAuth: true,
          page,
          limit,
        });
      } else {
        data = await PinsModel.getSavedPins({
          username,
          isAuth: false,
          page,
          limit,
        });
      }

      if (data.ok) {
        const { response: pins } = data;

        return res.status(200).json({ pins });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'Error fetching saved pins' });
    }
  }

  static async createPin(req, res) {
    const { id } = req.user;
    const { title, adultContent, altText, description, url } = req.body;
    let topics;
    let body;
    // Hay que parsearlo, ya que los Arrays
    // son tomados como Strings dentro del
    // formData
    const { topics: strArr } = req.body;

    if (strArr) topics = JSON.parse(strArr);
    else topics = null;

    // try {
    //   const result = createPinSchema.safeParse(req.body);

    //   if (!result.success) {
    //     return res.status(400).json({ issues: result.error.issues });
    //   }
    // } catch (err) {
    //   return res.status(500).json({ message: 'Internal error!' });
    // }

    if (req.files?.body) {
      const result = await uploadFileToCloudinary(req.files.body.tempFilePath);

      body = result.secure_url;
    }

    try {
      const data = objectsCreator(
        { title, adultContent, altText, description, url, body, topics },
        createPinSkeleton
      );
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

    // try {
    //   const result = editPinSchema.safeParse({
    //     id: pinID,
    //     title,
    //     description,
    //     url,
    //     adultContent,
    //     altText,
    //     topics,
    //   });

    //   if (!result.success) {
    //     return res.status(400).json({ issues: result.error.issues });
    //   }
    // } catch (err) {
    //   return res.status(500).json({ message: 'Internal error!' });
    // }

    try {
      const data = await PinsModel.pinPreviousValues({ id: pinID });
      const { response } = data;
      prevValues = response;
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get previous values!' });
    }

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
    const { id: pinID } = req.params;

    let data;

    try {
      if (req.isAuthenticated) {
        const { id: userID } = req.user;
        data = await PinsModel.getSinglePin({
          pinID,
          userID,
        });
      } else {
        data = await PinsModel.getSinglePinNotLogged({ pinID });
      }

      if (data.ok) {
        const { response: pin } = data;
        const filteredData = filterFalsyValues(pin);
        return res.status(200).json({ pin: filteredData });
      }
      return res.status(404).json({ message: 'Pin not found!' });
    } catch (err) {
      return res.status(404).json({ message: 'Pin not found!' });
    }
  }

  static async youMightAlsoLike(req, res) {
    const { page, limit } = req.query;
    const { id: pinID } = req.params;
    let data;

    try {
      if (req.isAuthenticated) {
        const { id: userID } = req.user;

        data = await PinsModel.youMightAlsoLike({
          page,
          limit,
          pinID,
          isAuth: true,
          userID,
        });
      } else {
        data = await PinsModel.youMightAlsoLike({
          page,
          limit,
          pinID,
          isAuth: false,
        });
      }

      if (data.ok) {
        const { pins, results } = data.response;
        const filteredPins = filterArrFalsyValues(pins);

        return res
          .status(200)
          .json({ response: { pins: filteredPins, results } });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Could not get similar pins' });
    }
  }

  static async toggleLikePin(req, res) {
    const { id: userID } = req.user;
    const { id: pinID } = req.params;

    try {
      const successfully = await PinsModel.toggleLikePin({ userID, pinID });

      if (successfully.ok) {
        return res
          .status(200)
          .json({ message: 'Operation successfully completed!' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Unexpected error!' });
    }
  }

  static async deletePin(req, res) {
    const { id: userID } = req.user;
    const { id: pinID } = req.params;

    // try {
    //   const result = deletePinSchema.safeParse({ pinID });

    //   if (!result.success) {
    //     return res.status(400).json({ issues: result.error.issues });
    //   }
    // } catch (err) {
    //   return res.status(500).json({ message: 'Internal error!' });
    // }

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
    const { page, limit } = req.query;
    let data;

    // try {
    //   const result = getHomePinsSchema.safeParse({ page, limit });

    //   if (!result.success) {
    //     return res.status(400).json({ issues: result.error.issues });
    //   }
    // } catch (err) {
    //   return res.status(500).json({ message: 'Internal error!' });
    // }

    try {
      if (req.isAuthenticated) {
        const { id } = req.user;

        data = await PinsModel.getHomePins({
          page,
          limit,
          isAuth: true,
          userID: id,
        });
      } else {
        data = await PinsModel.getHomePins({
          page,
          limit,
          isAuth: false,
        });
      }

      if (data.ok) {
        const { data: pins, results } = data.response;

        return res.status(200).json({ pins, results });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'Error' });
    }
  }

  static async searchPins(req, res) {
    const { value, page, limit } = req.query;
    let data;

    // try {
    //   const result = searchPinsSchema.safeParse({ page, limit, value });

    //   if (!result.success) {
    //     return res.status(400).json({ issues: result.error.issues });
    //   }
    // } catch (err) {
    //   return res.status(500).json({ message: 'Internal error!' });
    // }

    try {
      if (req.isAuthenticated) {
        const { id } = req.user;

        data = await PinsModel.searchPins({
          value,
          page,
          limit,
          isAuth: true,
          userID: id,
        });
      } else {
        data = await PinsModel.searchPins({
          value,
          page,
          limit,
          isAuth: false,
        });
      }

      if (data.ok) {
        const { data: pins, results } = data.response;
        const filteredPins = filterArrFalsyValues(pins);
        return res.status(200).json({ pins: filteredPins, results });
      }
    } catch (err) {
      return res.status(404).json({ message: 'Pins not found!' });
    }
  }

  static async searchByCategory(req, res) {
    const { category, page, limit } = req.query;
    let data;

    // try {
    //   const result = searchByCategorySchema.safeParse({
    //     page,
    //     limit,
    //     category,
    //   });

    //   if (!result.success) {
    //     return res.status(400).json({ issues: result.error.issues });
    //   }
    // } catch (err) {
    //   return res.status(500).json({ message: 'Internal error!' });
    // }

    try {
      if (req.isAuthenticated) {
        const { id } = req.user;

        data = await PinsModel.searchByCategory({
          category,
          page,
          limit,
          isAuth: true,
          userID: id,
        });
      } else {
        data = await PinsModel.searchByCategory({
          category,
          page,
          limit,
          isAuth: false,
        });
      }

      const { data: pins, results } = data.response;

      if (data.ok) {
        return res.status(200).json({ pins, results });
      }
      return res.status(400).json({ message: 'Cannot get pins!' });
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get pins!' });
    }
  }

  static async searchAutocompleteSuggestions(req, res) {
    try {
      const data = await PinsModel.searchAutocompleteSuggestions();

      if (data.ok) {
        const { response: suggestions } = data;
        const filteredSuggestions = filterArrFalsyValues(suggestions);

        return res.status(200).json({ suggestions: filteredSuggestions });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'Cannot get autocomplete suggestions!' });
    }
  }
}
