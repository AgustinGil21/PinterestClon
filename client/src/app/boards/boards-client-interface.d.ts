export interface IFormHook {
  errors: FieldErrors;
  register: UseFormRegister;
  watch: UseFormWatch;
}

export interface IHandleChange {
  key: string;
  value: string;
}
