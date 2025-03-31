import { TLang } from '../../../global-interfaces/global-interfaces';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputStyledInterface {
  type: string;
  classProps?: string;
  placeHolder?: string;
  errors?: string;
  register?: UseFormRegister<FieldValues>;
  infoName: string;
  value?: string | number;
  defaultChecked?: boolean;
  id?: string;
  min?: string;
  max?: string;
  checked?: boolean;
  defaultValue?: string;
  accept?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  name?: string;
  autoComplete?: string;
  lang?: TLang;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const InputStyled = ({
  type,
  accept,
  classProps,
  placeHolder,
  register,
  infoName,
  value,
  id,
  min,
  max,
  checked,
  defaultValue,
  disabled,
  readOnly,
  autoComplete = 'off',
  onBlur,
  onFocus,
  onClick,
  onChange,
  lang = 'en',
}: InputStyledInterface) => {
  return (
    <input
      autoComplete={autoComplete}
      onClick={onClick}
      onFocus={onFocus}
      readOnly={readOnly}
      accept={accept}
      checked={checked}
      min={min}
      defaultValue={defaultValue}
      max={max}
      id={id}
      value={value}
      type={type}
      disabled={disabled}
      className={` w-full p-1 text-black outline-outline-search  ${classProps}`}
      placeholder={placeHolder}
      lang={lang}
      {...(register ? register(infoName) : {})}
    />
  );
};

export default InputStyled;
