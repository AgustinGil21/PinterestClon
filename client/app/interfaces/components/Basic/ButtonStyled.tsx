interface ButtonProps {
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  btnRef?: React.RefObject<HTMLButtonElement>;
}

const ButtonStyled = ({
  children,
  className,
  handleClick,
  type,
  disabled,
  btnRef,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      type={type}
      className={`  text-nowrap rounded-3xl  py-2 px-3 text-sm ${className}`}
      ref={btnRef}
    >
      {children}
    </button>
  );
};

export default ButtonStyled;
