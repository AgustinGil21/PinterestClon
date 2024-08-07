import axios from 'axios';
import {
  ArrayCountriesSchema,
  ArrayGenderSchema,
  ArrayLanguagesSchema,
} from '../schemas/validation-service-api';
import { UserRegister, UserLogin, UserEmail } from '../types';

export const serviceGetGender = async () => {
  try {
    const response = await axios.get(
      'http://localhost:1234/pinterest-clon-api/genders'
    );

    const result = ArrayGenderSchema.safeParse(response.data);

    if (result.success) {
      return result.data.genders;
    }
  } catch (error) {
    console.log(error);
  }
};

export const serviceGetCountry = async () => {
  try {
    const response = await axios.get(
      'http://localhost:1234/pinterest-clon-api/countries'
    );

    const result = ArrayCountriesSchema.safeParse(response.data);

    if (result.success) {
      return result.data.countries;
    }
  } catch (error) {
    console.log(error);
  }
};

export const serviceGetLanguages = async () => {
  try {
    const response = await axios.get(
      'http://localhost:1234/pinterest-clon-api/languages'
    );

    const result = ArrayLanguagesSchema.safeParse(response.data);

    if (result.success) {
      return result.data.languages;
    }
  } catch (error) {
    console.log(error);
  }
};

export const serviceGetColors = async () => {
  try {
    const response = await axios.get('/colors.json');

    const { data } = response;
    const colors = data;

    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
  } catch (error) {
    console.log(error);
  }
};

export const servicePostEmailUser = async (data: UserEmail) => {
  try {
    const response = await axios.post(
      'http://localhost:1234/pinterest-clon-api/auth/email-address',
      data
    );
    console.log(response);
    console.log(response.status);
  } catch (error) {
    throw error;
  }
};

export const servicePostRegisterUser = async (data: UserRegister) => {
  try {
    const response = await axios.post(
      'http://localhost:1234/pinterest-clon-api/auth/register',
      data
    );
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
};

export const servicePostLoginUser = async (data: UserLogin) => {
  try {
    const response = await axios.post(
      'http://localhost:1234/pinterest-clon-api/auth/login',
      data
    );
    console.log(data);
    console.log(response);
    console.log(response.status);
  } catch (error) {
    throw error;
  }
};

export const serviceGetDataUserLogged = async () => {
  try {
    const response = await axios.get(
      'http://localhost:1234/pinterest-clon-api/'
    );

    console.log(response);
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
};

export const servicePostAvatarUser = async (data: any) => {
  try {
    const response = await axios.post(
      'http://localhost:1234/pinterest-clon-api/avatar',
      data
    );
    console.log(data);
    console.log(response);
    console.log(response.status);
  } catch (error) {
    throw error;
  }
};
