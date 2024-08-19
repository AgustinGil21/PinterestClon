import axios from 'axios';
import {
  ArrayCountriesSchema,
  ArrayGenderSchema,
  ArrayLanguagesSchema,
  UserDataSchema,
} from '../schemas/validation-service-api';
import {
  UserRegister,
  UserLogin,
  UserEmail,
  AvatarData,
  Country,
  Gender,
  Language,
  UserData,
} from '../../domain/types';

export const serviceGetGender = async (): Promise<Gender[]> => {
  try {
    const response = await axios.get(
      'http://localhost:1234/pinterest-clon-api/genders'
    );
    const result = ArrayGenderSchema.safeParse(response.data);
    return result.success ? result.data.genders : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const serviceGetCountry = async (): Promise<Country[]> => {
  try {
    const response = await axios.get(
      'http://localhost:1234/pinterest-clon-api/countries'
    );
    const result = ArrayCountriesSchema.safeParse(response.data);
    return result.success ? result.data.countries : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const serviceGetLanguages = async (): Promise<Language[]> => {
  try {
    const response = await axios.get(
      'http://localhost:1234/pinterest-clon-api/languages'
    );
    const result = ArrayLanguagesSchema.safeParse(response.data);
    return result.success ? result.data.languages : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const serviceGetColors = async (): Promise<any> => {
  try {
    const response = await axios.get('/colors.json');
    const colors = response.data;
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const servicePostEmailUser = async (data: UserEmail): Promise<void> => {
  try {
    await axios.post(
      'http://localhost:1234/pinterest-clon-api/auth/email-address',
      data,
      { withCredentials: true }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const servicePostRegisterUser = async (
  data: UserRegister
): Promise<void> => {
  try {
    await axios.post(
      'http://localhost:1234/pinterest-clon-api/auth/register',
      data,
      { withCredentials: true }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const servicePostLoginUser = async (data: UserLogin): Promise<void> => {
  try {
    await axios.post(
      'http://localhost:1234/pinterest-clon-api/auth/login',
      data,
      { withCredentials: true }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const serviceGetDataUserLogged = async () => {
  try {
    const response = await axios.get(
      'http://localhost:1234/pinterest-clon-api/',
      { withCredentials: true }
    );
    const result = UserDataSchema.safeParse(response.data.userData);
    return result.success ? result.data : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const servicePostAvatarUser = async (
  data: AvatarData
): Promise<void> => {
  try {
    await axios.post('http://localhost:1234/pinterest-clon-api/avatar', data, {
      withCredentials: true,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const servicePostLogOut = async (): Promise<void> => {
  try {
    await axios.post(
      'http://localhost:1234/pinterest-clon-api/auth/logout',
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
