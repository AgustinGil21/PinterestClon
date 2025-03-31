'use client';
import { useEffect, useState } from 'react';
import ButtonStyled from '../../components/Basic/ButtonStyled';
import { UseFormGetValues, UseFormWatch, FieldValues } from 'react-hook-form';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import useBarButtonsSettings from './barButtonsSettings/useBarButtonsSettings';

interface InterfaceBarButtons {
  getValues: UseFormGetValues<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  handleClick?: (data: any) => void;
}

const BarButtons = ({ getValues, watch, handleClick }: InterfaceBarButtons) => {
  const { handleReload, hasAnyValue } = useBarButtonsSettings({
    getValues,
    watch,
  });
  const { t } = useAppsStore();

  return (
    <div className=' bottom-[60px] md:bottom-0 left-0 fixed flex justify-center items-center w-full p-3 lg:p-5 bg-white shadow-top font-semibold dark:bg-slate-800 '>
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
          {t?.['footer-settings'].reset || 'Restablecer'}
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
          {t?.['footer-settings'].save || 'Guardar'}
        </ButtonStyled>
      </div>
    </div>
  );
};

export default BarButtons;
