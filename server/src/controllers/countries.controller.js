import CountriesModel from '../models/countries.model.js';
import { countrySchema } from '../schemas/country.schema.js';

export default class CountriesController {
  static async getCountries(req, res) {
    try {
      const data = await CountriesModel.getCountries();

      if (data.ok) {
        const { response: countries } = data;

        return res.status(200).json({ countries });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get countries!' });
    }
  }

  static async getCountryByID(req, res) {
    const { id } = req.params;

    try {
      const result = countrySchema.safeParse({ id });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const data = await CountriesModel.getCountryByID({ id });

      if (data.ok) {
        const { response: country } = data;
        return res.status(200).json({ country });
      }
    } catch (err) {
      return res.status(404).json({ message: 'Country not found!' });
    }
  }
}
