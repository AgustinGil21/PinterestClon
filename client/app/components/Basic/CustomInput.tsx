import ErrorStyled from '../../interfaces/components/Basic/ErrorStyled';
import { Textarea } from '@headlessui/react';
import { useEffect } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

interface IHandleChange {
  key: string;
  value: string;
}

interface IProps {
  className?: string;
  placeholder?: string;
  max?: number;
  min?: number;
  value?: string;
  prevValue?: string;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  register: UseFormRegister<FieldValues>;
  infoName: string;
  disabled?: boolean;
  textLabel?: string;
  labelClassName?: string;
  errorClassName?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
  watch: UseFormWatch<FieldValues>;
  handleChange: ({ key, value }: IHandleChange) => void;
  type?: string;
  readOnly?: boolean;
}

export const CustomInput = ({
  className,
  placeholder,
  max,
  min,
  value,
  errors,
  register,
  infoName,
  textLabel,
  labelClassName,
  errorClassName,
  onBlur,
  onClick,
  onFocus,
  children,
  watch,
  handleChange,
  prevValue,
  type = 'text',
  readOnly,
}: IProps) => {
  const areaRef = watch(infoName);

  useEffect(() => {
    if (areaRef !== undefined && prevValue !== areaRef) {
      handleChange({ key: infoName, value: areaRef });
    }
  }, [areaRef, handleChange]);

  return (
    <label className={labelClassName}>
      {textLabel && <span>{textLabel}</span>}
      {children}
      <input
        className={className}
        placeholder={placeholder}
        max={max}
        min={min}
        {...(register ? register(infoName) : {})}
        onBlur={onBlur}
        onClick={onClick}
        onFocus={onFocus}
        value={value}
        id={infoName}
        readOnly={readOnly}
        type={type}
      />
      {errors?.message && (
        <ErrorStyled classname={errorClassName}>
          {errors?.message as string}
        </ErrorStyled>
      )}
    </label>
  );
};
