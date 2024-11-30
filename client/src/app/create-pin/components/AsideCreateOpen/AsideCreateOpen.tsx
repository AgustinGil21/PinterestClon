import { useEffect } from 'react';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import PreviousPins from './PreviousPins/PreviousPins';
import ArrowCreatRightIcon from '@/app/interfaces/components/icons/ArrowCreatRightIcon';
import ButtonStyled from '@/app/interfaces/components/Basic/ButtonStyled';
import { FieldValues, UseFormClearErrors, UseFormReset } from 'react-hook-form';

interface AsideCreateOpenInterface {
  handleClick: () => void;
  clearErrors: UseFormClearErrors<FieldValues>;
  reset: UseFormReset<FieldValues>;
}

const AsideCreateOpen = ({
  handleClick,
  clearErrors,
  reset,
}: AsideCreateOpenInterface) => {
  const { getPreviousPins, previousPin, setImagePreview, shouldReload } =
    useAppsStore();

  useEffect(() => {
    getPreviousPins();
  }, [shouldReload]);

  const handleClickNewPin = () => {
    setImagePreview(null);

    clearErrors();
  };

  return (
    <div className='border-r-gray-300 border-r-[1px] w-[18%] min-w-[300px] h-full flex flex-col items-center gap-6'>
      <div className='border-b-[1px] border-b-gray-300 p-3 px-5 h-[139px] w-full pt-6'>
        <div className='flex flex-col gap-5 justify-between h-full'>
          <div className='flex justify-between items-center'>
            <h3 className='font-semibold dark:text-white text-xl'>
              Mis Publicaciones ({previousPin.length})
            </h3>
            <button
              className='hover:bg-slate-100 dark:hover:bg-black rounded-full p-2.5 cursor-pointer'
              onClick={handleClick}
            >
              <ArrowCreatRightIcon />
            </button>
          </div>
          <ButtonStyled
            className='bg-buttonGreyBg font-semibold w-full text-[1.1rem] hover:bg-gray-300 py-3.5'
            handleClick={handleClickNewPin}
          >
            Crear nuevo
          </ButtonStyled>
        </div>
      </div>

      <div className='w-full p-2 py-1 h-full flex flex-col gap-3 overflow-y-auto '>
        {previousPin.map((elem) => (
          <PreviousPins
            elem={elem}
            key={elem.id}
            reset={reset}
            clearErrors={clearErrors}
            lastPin={elem.id === previousPin[previousPin.length - 1].id}
          />
        ))}
      </div>
    </div>
  );
};

export default AsideCreateOpen;
