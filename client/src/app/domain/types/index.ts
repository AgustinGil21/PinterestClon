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
};

export interface UserData {
  account_type?: 'Personal' | 'Business';
  avatar_background: string;
  avatar_letter: string;
  avatar_letter_color: string;
  birthdate: string;
  country: string;
  created_at: string;
  email_address: string;
  gender?: 'Male' | 'Female' | 'Nonbinary';
  id: string;
  lang: string;
  username: string;
}

export interface AvatarData {
  name: string;
  lastModified: number;
  size: number;
  type: string;
  webkitRelativePath?: string;
}

export type UserLogin = {
  emailAddress: string;
  password: string;
};

export interface UserEmail {
  emailAddress: string;
}
