import { CategoriesPin, PinCreate } from '@/app/domain/types/pins-structure';
import { useAppsStore } from '@/app/infrastructure/stores/useAppStore';

interface ModalSearcherCategoriesInterface {
  imagePreview: string | null;
  isFocused: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  filterCategories: CategoriesPin[];
}

const ModalSearcherCategories = ({
  imagePreview,
  isFocused,
  handleClick,
  filterCategories,
}: ModalSearcherCategoriesInterface) => {
  const { t } = useAppsStore();

  return (
    <>
      {isFocused && imagePreview && (
        <div className='absolute rounded-xl shadow-3xl overflow-scroll list-none h-[170px] w-[86%] bg-white z-[100] top-[80px] left-[40px] py-3'>
          <span className='text-[10px] text-gray-500 px-3 '>
            {t?.['create-pin'].form.categories.results ||
              'Etiquetas coincidentes'}{' '}
            ({filterCategories.length})
          </span>
          {filterCategories.map((elem) => (
            <div key={elem.id} className=''>
              <button
                className='text-[12px] font-semibold  hover:bg-gray-200 py-2 px-3 cursor-pointer w-full text-start   '
                onClick={handleClick}
                data-name={elem.name}
                value={elem.name}
              >
                {elem.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ModalSearcherCategories;
