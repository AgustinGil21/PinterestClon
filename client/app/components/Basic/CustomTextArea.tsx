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
  maxLength?: number;
  minLength?: number;
  value?: string;
  prevValue?: string;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  register: UseFormRegister<FieldValues>;
  infoName: string;
  disabled?: boolean;
  textLabel?: string;
  labelClassName?: string;
  errorClassName?: string;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onClick?: React.MouseEventHandler<HTMLTextAreaElement>;
  children?: React.ReactNode;
  watch: UseFormWatch<FieldValues>;
  handleChange: ({ key, value }: IHandleChange) => void;
}

export const CustomTextArea = ({
  className,
  placeholder,
  maxLength,
  minLength,
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
      <Textarea
        className={className}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        {...(register ? register(infoName) : {})}
        onBlur={onBlur}
        onClick={onClick}
        onFocus={onFocus}
        value={value}
        id={infoName}
      />
      {errors?.message && (
        <ErrorStyled classname={errorClassName}>
          {errors?.message as string}
        </ErrorStyled>
      )}
    </label>
  );
};
