import LanguagesModel from '../models/languages.model.js';
import { langSchema } from '../schemas/languages.schema.js';
export default class LanguagesController {
    static async getLanguages(req, res) {
        try {
            const data = await LanguagesModel.getLanguages();
            if (data.ok) {
                const { response: languages } = data;
                return res.status(200).json({ languages });
            }
        }
        catch (err) {
            return res.status(400).json({ message: 'Cannot get languages!' });
        }
    }
    static async getLanguageByID(req, res) {
        const { id } = req.params;
        try {
            const result = langSchema.safeParse({ id });
            if (!result.success) {
                return res.status(400).json({ issues: result.error.issues });
            }
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal error!' });
        }
        try {
            const data = await LanguagesModel.getLanguageByID({ id });
            if (data.ok) {
                const { response: lang } = data;
                return res.status(200).json({ lang });
            }
        }
        catch (err) {
            return res.status(404).json({ message: 'Language not found!' });
        }
    }
}
