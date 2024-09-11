import ArrowsCreatLeftIcon from '@/app/interfaces/components/icons/ArrowsCreatLeftIcon';
import PlusIcon from '@/app/interfaces/components/icons/PlusIcon';

interface AsideCreateOpenInterface {
  handleClick: () => void;
}

const AsideCreateClose = ({ handleClick }: AsideCreateOpenInterface) => {
  return (
    <div className='border-r-gray-300  border-r-[1px] w-[3.5%] h-full flex flex-col items-center gap-6'>
      <div className='flex flex-col items-center gap-6 border-b-[1px] w-full py-5 '>
        <button
          className='hover:bg-slate-100 dark:hover:bg-black rounded-full p-2.5 cursor-pointer'
          onClick={handleClick}
        >
          <ArrowsCreatLeftIcon />
        </button>
        <div className='hover:bg-slate-100 rounded-full p-2.5 cursor-pointer dark:hover:bg-black '>
          <PlusIcon />
        </div>
      </div>
    </div>
  );
};

export default AsideCreateClose;
