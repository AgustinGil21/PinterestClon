import { UUIDType } from '../../basic/basics-interface.js';

export interface IGetUserByUsername {
  username: string;
}

export interface IGetUserByUsernameAndId {
  username: string;
  id: UUIDType;
}
