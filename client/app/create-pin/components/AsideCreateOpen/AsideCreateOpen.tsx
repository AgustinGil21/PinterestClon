import { useEffect } from 'react';
import { useAppsStore } from '../../../infrastructure/stores/useAppStore';
import PreviousPins from './PreviousPins/PreviousPins';
import ArrowCreatRightIcon from '../../../interfaces/components/icons/ArrowCreatRightIcon';
import ButtonStyled from '../../../interfaces/components/Basic/ButtonStyled';
import { FieldValues, UseFormClearErrors, UseFormReset } from 'react-hook-form';
import { numberFormatter } from '../../../libs/NumberFormatter';

interface AsideCreateOpenInterface {
  handleClick: () => void;
  clearErrors: UseFormClearErrors<FieldValues>;
  reset: UseFormReset<FieldValues>;
  onClick: () => void;
}

const AsideCreateOpen = ({
  handleClick,
  clearErrors,
  reset,
  onClick,
}: AsideCreateOpenInterface) => {
  const { getPreviousPins, previousPin, setImagePreview, shouldReload, t } =
    useAppsStore();

  const pinsCount = numberFormatter(previousPin.length);

  useEffect(() => {
    getPreviousPins();
  }, [shouldReload]);

  const handleClickNewPin = () => {
    setImagePreview(null);

    clearErrors();
  };

  return (
    <div
      className='border-r-gray-300 border-r-[1px] min-w-[300px] h-full flex flex-col items-center gap-6 previous-pins-aside overflow-y-auto'
      style={{ maxHeight: '100vh' }}
    >
      <div className='border-b-[1px] border-b-gray-300 p-3 px-5 h-[139px] w-full pt-6 max-w-[600px]'>
        <div className='flex flex-col gap-5 justify-between h-full'>
          <div className='flex justify-between items-center'>
            <h3 className='font-semibold dark:text-white text-md'>
              {t?.['create-pin'].aside.posts || 'Publicaciones'} ( {pinsCount} )
            </h3>
            <button
              className='hover:bg-slate-100 dark:hover:bg-black rounded-full p-2.5 cursor-pointer'
              onClick={handleClick}
            >
              <ArrowCreatRightIcon />
            </button>
          </div>
          <ButtonStyled
            className='bg-buttonGreyBg font-semibold w-full text-[1.1rem] hover:bg-gray-300 py-3.5 max-w-[300px] self-center'
            handleClick={handleClickNewPin}
          >
            {t?.['create-pin'].aside.create || 'Crear nuevo'}
          </ButtonStyled>
        </div>
      </div>

      <div className='w-full p-2 py-1 flex flex-col-reverse gap-3 max-w-[600px] items-center'>
        {previousPin.map((elem) => (
          <PreviousPins
            elem={elem}
            key={elem.id}
            reset={reset}
            clearErrors={clearErrors}
            lastPin={elem.id === previousPin[0].id}
            editModalOnClick={onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default AsideCreateOpen;
