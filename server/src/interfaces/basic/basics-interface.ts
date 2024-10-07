export type DateStrOrNumber = string | number;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type GenericObject<T> = Record<string, T>;

export type UUIDType = `${string}-${string}-${string}-${string}-${string}`;
