import { EmailAddress } from '../../auth/auth-interface.js';
import { UUIDType } from '../../basic/basics-interface.js';

export interface ComparePasswordsParams {
  id: UUIDType;
  prevPassword: string;
}

export interface SetPasswordParams {
  id: UUIDType;
  password: string;
}

export interface EditDataParams {
  id: UUIDType;
  emailAddress: EmailAddress;
  birthdate: Date;
  gender: UUIDType;
  country: UUIDType;
  language: UUIDType;
}
