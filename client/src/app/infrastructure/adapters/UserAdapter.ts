import {
  serviceGetCountry,
  serviceGetDataUserLogged,
  serviceGetGender,
  serviceGetLanguages,
  servicePostEmailUser,
  servicePostLoginUser,
  servicePostLogOut,
  servicePostRegisterUser,
} from '../services/service-register';
import {
  Country,
  Gender,
  Language,
  UserEmail,
  UserLogin,
  UserPublicData,
  UserPublicDataExtraInfo,
  UserDataAccountEdit,
} from '../../domain/types';
import {
  serviceDeleteAccountUser,
  serviceGetDataAccountManagment,
  servicePutUserPublicData,
} from '../services/service-user-edit';

export const fetchGendersAdapter = async (): Promise<Gender[]> => {
  return await serviceGetGender();
};

export const fetchCountriesAdapter = async (): Promise<Country[]> => {
  return await serviceGetCountry();
};

export const fetchLanguagesAdapter = async (): Promise<Language[]> => {
  return await serviceGetLanguages();
};

export const postEmailUserAdapter = async (data: UserEmail): Promise<void> => {
  await servicePostEmailUser(data);
};

export const postLoginUserAdapter = async (data: UserLogin): Promise<void> => {
  await servicePostLoginUser(data);
};

export const postRegisterUserAdapter = async (
  data: FormData
): Promise<void> => {
  await servicePostRegisterUser(data);
};

export const postLogOutUserAdapter = async (): Promise<void> => {
  await servicePostLogOut();
};

export const fetchUserLoggedAdapter =
  async (): Promise<UserPublicData | null> => {
    try {
      const response = await serviceGetDataUserLogged();
      console.log(response);
      if (response) {
        return {
          avatar_background: response.avatar_background,
          avatar_letter: response.avatar_letter,
          avatar_letter_color: response.avatar_letter_color,
          email_address: response.email_address,
          username: response.username,
          account_type: response.account_type,
          avatar: response.avatar,
          name: response.name,
          surname: response.surname,
          about: response.about,
          website: response.website,
        };
      }

      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const fetchUserEditDataAdapter =
  async (): Promise<UserDataAccountEdit | null> => {
    try {
      const response = await serviceGetDataAccountManagment();
      if (response) {
        return {
          email_address: response.email_address,
          birthdate: new Date(response.birthdate).toISOString().split('T')[0],
          country: response.country,
          account_type: response.account_type,
          language: response.language,
          gender: response.gender,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const putUserPublicDataAdapter = async (
  data: UserPublicDataExtraInfo
) => {
  try {
    await servicePutUserPublicData(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUserAccountAdapter = async () => {
  try {
    await serviceDeleteAccountUser();
  } catch (error) {
    console.log(error);
    return null;
  }
};
