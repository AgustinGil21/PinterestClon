import {
  serviceGetCountry,
  serviceGetDataUserLogged,
  serviceGetGender,
  serviceGetLanguages,
  servicePostAvatarUser,
  servicePostEmailUser,
  servicePostLoginUser,
  servicePostLogOut,
  servicePostRegisterUser,
} from '../services/service-register';
import {
  AvatarData,
  Country,
  Gender,
  Language,
  UserEmail,
  UserLogin,
  UserRegister,
  UserData,
} from '../../domain/types';

export const fetchGenders = async (): Promise<Gender[]> => {
  return await serviceGetGender();
};

export const fetchCountries = async (): Promise<Country[]> => {
  return await serviceGetCountry();
};

export const fetchLanguages = async (): Promise<Language[]> => {
  return await serviceGetLanguages();
};

export const postAvatarUser = async (data: AvatarData): Promise<void> => {
  await servicePostAvatarUser(data);
};

export const postEmailUser = async (data: UserEmail): Promise<void> => {
  await servicePostEmailUser(data);
};

export const postLoginUser = async (data: UserLogin): Promise<void> => {
  await servicePostLoginUser(data);
};

export const postRegisterUser = async (data: UserRegister): Promise<void> => {
  await servicePostRegisterUser(data);
};

export const postLogOutUser = async (): Promise<void> => {
  await servicePostLogOut();
};

export const fetchUserLogged = async (): Promise<UserData | null> => {
  try {
    const response = await serviceGetDataUserLogged();
    if (response) {
      return {
        id: response.id,
        avatar_background: response.avatar_background,
        avatar_letter: response.avatar_letter,
        avatar_letter_color: response.avatar_letter_color,
        birthdate: new Date(response.birthdate).toLocaleDateString(),
        country: response.country,
        created_at: new Date(response.created_at).toLocaleDateString(),
        email_address: response.email_address,
        lang: response.lang,
        username: response.username,
        account_type: response.account_type,
        gender: response.gender,
      };
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
