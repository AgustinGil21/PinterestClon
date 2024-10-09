import { EmailAddress } from '../../auth/auth-interface.js';
import {
  Hexadecimal,
  UrlType,
  UUIDType,
} from '../../basic/basics-interface.js';

export interface IEmailAddressParams {
  emailAddress: EmailAddress;
}

export interface IEmailAddressAndPasswordParams {
  password: string;
  emailAddress: string;
}

export interface IRegisterParams {
  emailAddress: EmailAddress;
  password: string;
  username: string;
  birthdate: Date;
  genderId: UUIDType;
  langId: UUIDType;
  countryId: UUIDType;
  avatarBackground: Hexadecimal;
  avatarLetterColor: Hexadecimal;
  avatarLetter: string;
  avatar?: UrlType;
}
