import { ResponseErrors, zodErrors } from './errors-handler';

export const validateSchema = async ({ schema, data, res }) => {
  try {
    const result = schema.safeParse(data);

    if (!result.success) {
      const message = zodErrors(result.error);
      return res.status(422).json(message);
    }
  } catch (err) {
    throw new Error(ResponseErrors.internalErr);
  }
};
