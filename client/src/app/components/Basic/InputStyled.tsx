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
}

const InputStyled = ({
  type,
  classProps,
  placeHolder,
  register,
  infoName,
  value,
  id,
}: InputStyledInterface) => {
  return (
    <input
      id={id}
      defaultChecked
      value={value}
      type={type}
      className={` w-full p-1 text-black outline-outline-search ${classProps}`}
      placeholder={placeHolder}
      {...(register ? register(infoName) : {})}
    />
  );
};

export default InputStyled;
