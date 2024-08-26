'use client';
import { useEffect, useState } from 'react';
import ButtonStyled from '../../components/Basic/ButtonStyled';
import { UseFormGetValues, UseFormWatch, FieldValues } from 'react-hook-form';

interface InterfaceBarButtons {
  getValues: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  handleClick?: (data: any) => void;
}

const BarButtons = ({ getValues, watch, handleClick }: InterfaceBarButtons) => {
  const [hasAnyValue, setHasAnyValue] = useState(false);

  useEffect(() => {
    const checkValues = () => {
      const currentValues = getValues();
      const hasValue = Object.values(currentValues).some(
        (value) => typeof value === 'string' && value.trim().length > 0
      );
      setHasAnyValue(hasValue);
    };

    checkValues();

    const subscription = watch(() => {
      checkValues();
    });

    return () => subscription.unsubscribe();
  }, [getValues, watch]);

  const handleReload = (e: any) => {
    e.preventDefault();
    if (!hasAnyValue) return;
    window.location.reload();
  };

  return (
    <div className='bottom-0 left-0 fixed w-full p-5 bg-white shadow-top font-semibold dark:bg-slate-800'>
      <div className='flex flex-row gap-2 max-w-[850px] justify-end'>
        <ButtonStyled
          handleClick={handleReload}
          disabled={!hasAnyValue}
          className={`bg-buttonGreyBg py-2 font-semibold dark:text-black ${
            !hasAnyValue
              ? 'opacity-50 cursor-not-allowed'
              : ' hover:bg-gray-300'
          }`}
        >
          Restablecer
        </ButtonStyled>
        <ButtonStyled
          handleClick={handleClick}
          disabled={!hasAnyValue}
          className={`text-white py-2 font-semibold  ${
            !hasAnyValue
              ? 'opacity-50 bg-gray-500 cursor-not-allowed'
              : 'bg-redPinterestBg hover:bg-red-700'
          }`}
        >
          Guardar
        </ButtonStyled>
      </div>
    </div>
  );
};

export default BarButtons;
