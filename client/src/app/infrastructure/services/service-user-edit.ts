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

export const servicePutUserPublicData = async (data: UserPublicData) => {
  try {
    const response = await axios.put(
      'http://localhost:1234/pinterest-clon-api/settings/edit-profile',
      {
        data,
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
