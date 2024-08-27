import axios from 'axios';
import { UserAccountManagmentSchema } from '../schemas/validation-service-api';
import { UserDataAccountEdit, UserPublicData } from '@/app/domain/types';

export const serviceGetDataAccountManagment =
  async (): Promise<UserDataAccountEdit | null> => {
    try {
      const response = await axios.get(
        'http://localhost:1234/pinterest-clon-api/settings/account-management/',
        { withCredentials: true }
      );

      const result = UserAccountManagmentSchema.safeParse(
        response.data.userData
      );
      return result.success ? result.data : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const serviceGetEditProfileData =
  async (): Promise<UserDataAccountEdit | null> => {
    try {
      const response = await axios.get(
        'http://localhost:1234/pinterest-clon-api/settings/edit-profile/',
        { withCredentials: true }
      );

      // if (response) response.data;
      // return null;
      const result = UserAccountManagmentSchema.safeParse(
        response.data.userData
      );
      return result.success ? result.data : null;
    } catch (error) {
      return null;
    }
  };

export const servicePutUserPublicData = async (data: UserPublicData) => {
  console.log(data);

  const newData = {
    name: data?.name,
    surname: data?.surname,
    about: data?.about,
    website: data?.website,
    username: data?.username,
  };

  try {
    const response = await axios.put(
      'http://localhost:1234/pinterest-clon-api/settings/edit-profile',
      {
        ...newData,
      },
      { withCredentials: true }
    );

    console.log(response.status);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const serviceGetUserPublicData = async () => {
  try {
    const response = await axios.get(
      'http://localhost:1234/pinterest-clon-api/settings/edit-profile',

      { withCredentials: true }
    );

    console.log(response.status);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

serviceGetUserPublicData();

export const serviceDeleteAccountUser = async () => {
  try {
    const response = await axios.delete(
      'http://localhost:1234/pinterest-clon-api/settings/account-management/delete-account',
      { withCredentials: true }
    );
    console.log(response.status);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
