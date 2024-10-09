import { UrlType, UUIDType } from '../../basic/basics-interface.js';
import { IGetWithPaging } from '../basics/basic-models&controllers-interface.js';

export interface ISearchByCategory extends IGetWithPaging {
  category: UUIDType;
}

interface IPinsBody {
  title?: string;
  description?: string;
  adultContent?: boolean;
  url?: UrlType | '';
  topics?: UUIDType[];
  altText?: string;
}

export interface ICreatePin extends IPinsBody {
  id: UUIDType;
  body: UrlType;
  type?: number;
}

export interface IEditPin extends IPinsBody {
  pinID: UUIDType;
  userID: UUIDType;
}

export interface IDeletePin {
  pinID: UUIDType;
  userID: UUIDType;
}

export interface IGetCreatedPins {
  username: string;
}
