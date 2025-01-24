import {
  ITranslation,
  TTranslationKey,
} from '../global-interfaces/translation-interface';

export const getObjectByKey = (
  obj: ITranslation | null,
  key: TTranslationKey
) => {
  return obj?.[key] ?? {};
};
