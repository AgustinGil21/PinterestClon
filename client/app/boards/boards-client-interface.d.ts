export interface IFormHook {
  errors: FieldErrors;
  register: UseFormRegister;
  watch: UseFormWatch;
  setValue?: UseFormSetValue;
}

export interface IHandleChange {
  key: string;
  value: string;
}
