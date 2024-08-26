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
  account_type?: string;
  avatar_letter?: string;
  avatar_letter_color?: string;
  avatar_background?: string;
  email_address?: string;
  username?: string;
  avatar?: string;
  name?: string;
  surname?: string;
  about?: string;
  website?: string;
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

export interface UserPublicDataExtraInfo {
  username?: string;
  name?: string;
  surname?: string;
  about?: string;
  website?: string;
}
