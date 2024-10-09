import CategoriesModel from '../models/categories.model.js';
import {
  searchByIDSchema,
  searchByNameSchema,
} from '../schemas/categories.schema.js';

export default class CategoriesController {
  static async getCategories(req, res) {
    try {
      const data = await CategoriesModel.getCategories();

      if (data.ok) {
        const { response: categories } = data;
        return res.status(200).json({ categories });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Cannot get categories!' });
    }
  }

  static async searchByID(req, res) {
    const { id } = req.params;

    try {
      const result = searchByIDSchema.safeParse({ id });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const data = await CategoriesModel.searchByID({ id });

      if (data.ok) {
        const { response: category } = data;
        return res.status(200).json({ category });
      }
    } catch (err) {
      return res.status(404).json({ message: 'Category not found!' });
    }
  }

  static async searchByCategoryByName(req, res) {
    const { value } = req.query;

    try {
      const result = searchByNameSchema.safeParse({ value });

      if (!result.success) {
        return res.status(400).json({ issues: result.error.issues });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal error!' });
    }

    try {
      const data = await CategoriesModel.searchCategoryByName({ value });

      if (data.ok) {
        const { data: categories, results } = data.response;
        return res.status(200).json({ categories, results });
      }
    } catch (err) {
      return res.status(404).json({ message: 'Category not found!' });
    }
  }
}
