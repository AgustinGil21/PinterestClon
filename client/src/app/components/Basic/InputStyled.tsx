import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputStyledInterface {
  type: string;
  classProps?: string;
  placeHolder?: string;
  errors?: string;
  register?: UseFormRegister<FieldValues>;
  name?: string;
  value?: string | number;
  defaultChecked?: boolean;
}

const InputStyled = ({
  type,
  classProps,
  placeHolder,
  register,
  value,
}: InputStyledInterface) => {
  return (
    <input
      defaultChecked
      value={value}
      type={type}
      className={` w-full p-1 text-black outline-outline-search ${classProps}`}
      placeholder={placeHolder}
      {...(register ? register(type) : {})}
    />
  );
};

export default InputStyled;
