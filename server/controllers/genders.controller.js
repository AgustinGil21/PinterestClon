import GendersModel from '../models/genders.model.js';
import { genderSchema } from '../schemas/genders.schema.js';

export default class GendersController {
  static async getGenders(req, res) {
    try {
      const data = await GendersModel.getGenders();

      if (data.ok) {
        const { response: genders } = data;

        return res.status(200).json({ genders });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get genders!' });
    }
  }

  static async getGenderByID(req, res) {
    const { id } = req.params;

    try {
      const result = genderSchema.safeParse({ id });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const data = await GendersModel.getGenderByID({ id });

      if (data.ok) {
        const { response: gender } = data;

        return res.status(200).json({ gender });
      }
    } catch (err) {
      return res.status(404).json({ message: 'Gender not found!' });
    }
  }
}
