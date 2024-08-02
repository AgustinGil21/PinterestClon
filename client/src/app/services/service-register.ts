import axios from 'axios';
import { userSchema } from '../schemas/validation-service-api';

export const serviceGetDataUser = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/users/1');

    const userData = response.data;

    const validation = userSchema.safeParse(userData);

    console.log(validation);

    if (validation.success) {
      return validation.data;
    }
  } catch (error) {
    console.log(error);
  }
};
