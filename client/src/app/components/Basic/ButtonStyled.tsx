interface ButtonProps {
  handleClick?: (event: React.FormEvent) => void;
  className: string;
  children: React.ReactNode;
  type?: 'button' | 'submit';
  disabled: boolean;
}

const ButtonStyled = ({
  children,
  className,
  handleClick,
  type,
}: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      type={type}
      className={`py-2 px-3 text-sm text-nowrap rounded-3xl  ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonStyled;
