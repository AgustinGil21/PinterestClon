import { UUIDType } from '../../basic/basics-interface.js';

export type IdParams = {
  id: UUIDType;
};

export interface IGetWithPaging {
  page: number;
  limit: number;
}

export interface ISearchWithValue extends IGetWithPaging {
  value: string;
}
