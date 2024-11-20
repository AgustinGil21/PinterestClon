interface ButtonProps {
  handleClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => void;
  className: string;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const ButtonStyled = ({
  children,
  className,
  handleClick,
  type,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      type={type}
      className={`py-2 px-3 text-sm text-nowrap rounded-3xl  ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonStyled;
