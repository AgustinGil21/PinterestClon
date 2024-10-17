import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';
import XValueModalIcon from '@/app/interfaces/components/icons/XValueModalIcon';

interface LabelsSearchInterface {
  handleClick: (elem: string) => Promise<void>;
}

const LabelsSearch = ({ handleClick }: LabelsSearchInterface) => {
  const { valuesSearch, removeValueFromSearch } = useAppsStore();

  return (
    <>
      <span className='font-semibold text-sm my-4'>Búsquedas recientes</span>
      <div className='flex gap-1 flex-row flex-wrap mt-2'>
        {valuesSearch.map((elem, index) => (
          <div
            onClick={() => handleClick(elem)}
            key={index}
            className='bg-gray-200 rounded-2xl p-1 px-3 flex flex-row items-center gap-3 hover:bg-gray-300 cursor-pointer'
          >
            <span className='text-[14px]'>{elem}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeValueFromSearch(elem);
              }}
            >
              <XValueModalIcon />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default LabelsSearch;
