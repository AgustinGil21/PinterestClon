export interface Gender {
  id: string;
  name: string;
}

export interface ArrayGender {
  genders: Gender[];
}

export interface Country {
  id: string;
  prefix: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
  abbreviation: string;
}

export interface ArrayLanguages {
  languages: Language[];
}

export interface UserPublicData {
  avatar_letter?: string;
  avatar_letter_color?: string;
  avatar_background?: string;
  email_address?: string;
  username?: string;
  name?: string;
  surname?: string;
  avatar: File | null | any;
  lang: string;
}

export interface AvatarData {
  name: string;
  lastModified: number;
  size: number;
  type: string;
  webkitRelativePath?: string;
}

export type UserRegister = {
  emailAddress: string;
  password: string;
  username: string;
  birthdate: string;
  genderId: string;
  countryId: string;
  langId: string;
  avatarBackground: string;
  avatarLetterColor: string;
  avatarLetter: string;
  avatar: File;
};

export type UserLogin = {
  emailAddress: string;
  password: string;
};

export interface UserEmail {
  emailAddress: string;
}

export interface UserDataAccountEdit {
  email_address: string;
  birthdate: string;
  gender: string;
  country: string;
  language: string;
  account_type: string;
}

export interface UserPutAccountManagement {
  emailAddress: string;
  gender: string;
  country: string;
  language: string;
  birthdate: string;
}

export interface UserSettingsEditProfile {
  avatar_letter?: string;
  avatar_letter_color?: string;
  avatar_background?: string;
  username?: string;
  name?: string;
  surname?: string;
  about_you?: string;
  website?: string;
  avatar?: File;
}

export interface UserProfileVisibility {
  account_type?: string;
  private_account?: boolean;
}

export interface UserPatchPasswordAccountManagement {
  prevPassword: string;
  newPassword: string;
}

export interface UserPatchAvatar {
  avatar: File;
}
