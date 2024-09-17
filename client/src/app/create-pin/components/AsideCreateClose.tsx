import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import ArrowsCreatLeftIcon from '@/app/interfaces/components/icons/ArrowsCreatLeftIcon';
import PlusIcon from '@/app/interfaces/components/icons/PlusIcon';
import { UseFormClearErrors, FieldValues } from 'react-hook-form';

interface AsideCreateCloseInterface {
  handleClick: () => void;
  clearErrors: UseFormClearErrors<FieldValues>;
}

const AsideCreateClose = ({
  handleClick,
  clearErrors,
}: AsideCreateCloseInterface) => {
  const { setImagePreview, updateStateCreatePin } = useAppsStore();
  const handleClickPlusPín = () => {
    setImagePreview(null);
    updateStateCreatePin('title', '');
    updateStateCreatePin('altText', '');
    updateStateCreatePin('description', '');
    updateStateCreatePin('url', '');
    updateStateCreatePin('adultContent', false);
    updateStateCreatePin('topics', '');

    clearErrors();
  };
  return (
    <div className='border-r-gray-300  border-r-[1px] w-[3.5%] h-full flex flex-col items-center gap-6 '>
      <div className='flex flex-col items-center gap-6 border-b-[1px] w-full py-5 '>
        <button
          className='hover:bg-slate-100 dark:hover:bg-black rounded-full p-2.5 cursor-pointer'
          onClick={handleClick}
        >
          <ArrowsCreatLeftIcon />
        </button>
        <button
          className='hover:bg-slate-100 rounded-full p-2.5 cursor-pointer dark:hover:bg-black '
          onClick={handleClickPlusPín}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default AsideCreateClose;
