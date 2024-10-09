import { GenericObject } from '../interfaces/basic/basics-interface.d.js';

type Obj<T> = GenericObject<T>;
type Arr<T> = Obj<T>[];

export const filterFalsyValues = <T>(obj: Obj<T>) => {
  for (let key in obj) {
    if (!obj[key] && typeof obj[key] !== 'boolean') {
      delete obj[key];
    }
  }

  return obj;
};

export const filterArrFalsyValues = <T>(arr: Arr<Obj<T>>): Arr<Obj<T>> => {
  return arr.map(<T>(obj: Obj<T>) => filterFalsyValues(obj));
};
