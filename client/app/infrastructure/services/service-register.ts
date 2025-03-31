import axios from 'axios';
import { URLDOMAIN } from '../../interfaces/helpers/urldomain'; // Asegúrate de importar URLDOMAIN
import {
  ArrayCountriesSchema,
  ArrayGenderSchema,
  ArrayLanguagesSchema,
  UserDataSchema,
} from '../schemas/validation-service-api';
import {
  UserLogin,
  UserEmail,
  Country,
  Gender,
  Language,
} from '../../domain/types';

export const serviceGetGender = async (): Promise<Gender[]> => {
  try {
    const response = await axios.get(`${URLDOMAIN}/genders`);
    const result = ArrayGenderSchema.safeParse(response.data);
    return result.success ? result.data.genders : [];
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al obtener los géneros'
    );
  }
};

export const serviceGetCountry = async (): Promise<Country[]> => {
  try {
    const response = await axios.get(`${URLDOMAIN}/countries`);
    const result = ArrayCountriesSchema.safeParse(response.data);
    return result.success ? result.data.countries : [];
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al obtener los países'
    );
  }
};

export const serviceGetLanguages = async (): Promise<Language[]> => {
  try {
    const response = await axios.get(`${URLDOMAIN}/languages`);
    const result = ArrayLanguagesSchema.safeParse(response.data);
    return result.success ? result.data.languages : [];
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al obtener los idiomas'
    );
  }
};

export const serviceGetColors = async (): Promise<any> => {
  try {
    const response = await axios.get('/colors.json');
    const colors = response.data;
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al obtener los colores'
    );
  }
};

export const servicePostEmailUser = async (data: UserEmail): Promise<void> => {
  try {
    await axios.post(`${URLDOMAIN}/auth/email-address`, data, {
      withCredentials: true,
    });
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al enviar el correo electrónico'
    );
  }
};

export const servicePostRegisterUser = async (
  formData: FormData
): Promise<void> => {
  try {
    await axios.post(`${URLDOMAIN}/auth/register`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al registrar el usuario'
    );
  }
};

export const servicePostLoginUser = async (data: UserLogin): Promise<void> => {
  try {
    await axios.post(`${URLDOMAIN}/auth/login`, data, {
      withCredentials: true,
    });
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al iniciar sesión'
    );
  }
};

export const serviceGetDataUserLogged = async () => {
  try {
    const response = await axios.get(`${URLDOMAIN}/`, {
      withCredentials: true,
    });

    const result = UserDataSchema.safeParse(response.data.userData);

    return result.success ? result.data : null;
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al obtener los datos del usuario'
    );
  }
};

export const servicePostLogOut = async (): Promise<void> => {
  try {
    await axios.post(`${URLDOMAIN}/auth/logout`, {}, { withCredentials: true });
  } catch (error: unknown) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        'Error al cerrar sesión'
    );
  }
};
