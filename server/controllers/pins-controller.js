import PinsModel from '../models/pins.model.js';
import { getSinglePinSchema } from '../schemas/pins.schema.js';

export default class PinsController {
  static async getCreatedPins(req, res) {
    const { id } = req.user;

    try {
      const data = await PinsModel.getCreatedPins({ id });

      if (data.ok) {
        const { response: pins } = data;

        return res.status(200).json({ pins });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Error' });
    }
  }

  static async editPin(req, res) {}

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
    } catch (err) {
      return res.status(404).json({ message: 'Pin not found!' });
    }
  }
}
