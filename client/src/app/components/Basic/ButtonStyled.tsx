interface ButtonProps {
  //   handleClick: () => void;
  className: string;
  children: React.ReactNode;
  //   type: 'button' | 'submit';
  disabled: boolean;
}

const ButtonStyled = ({ children, className }: ButtonProps) => {
  return (
    <button
      className={`py-2 px-3 text-sm text-nowrap rounded-3xl  ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonStyled;
