import { UrlType, UUIDType } from '../../basic/basics-interface.js';

export interface IEditData {
  id: UUIDType;
  username?: string;
  name?: string;
  surname?: string;
  about_you?: string;
  website?: UrlType | '';
  birthdate?: Date;
}
