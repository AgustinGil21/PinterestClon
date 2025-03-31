import React from 'react';
import EyeIcon from '../icons/EyeIcon';
import EyesCloseIcon from '../icons/EyesCloseIcon';

interface EyePaswwordStyledInterface {
  togglePasswordVisibility?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  showPassword: boolean;
  classname: string;
}

const EyePasswordStyled = ({
  togglePasswordVisibility,
  showPassword,
  classname,
}: EyePaswwordStyledInterface) => {
  return (
    <div className={`absolute ${classname}`}>
      <button
        type='button'
        onClick={togglePasswordVisibility}
        className='absolute right-3  bottom-2 transform -translate-y-1/2'
      >
        {showPassword ? <EyeIcon /> : <EyesCloseIcon />}
      </button>
    </div>
  );
};

export default EyePasswordStyled;
