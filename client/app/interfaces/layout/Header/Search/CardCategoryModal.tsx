import { CategoriesPin } from '../../../../domain/types/pins-structure';
import { useAppsStore } from '../../../../infrastructure/stores/useAppStore';
import useSearchCategory from '../../../hooks/useSearchCategory';
import { useRouter } from 'next/navigation';

interface CardCategoryInterface {
  elem: CategoriesPin;
  setModal: (value: boolean) => void;
}

const CardCategoryModal = ({ elem, setModal }: CardCategoryInterface) => {
  const router = useRouter();
  let limit = 25;
  const { getSearchPinForCategory, t } = useAppsStore();
  const { handleSearchCategory } = useSearchCategory({
    getSearchPinForCategory: getSearchPinForCategory,
  });

  const handleClick = async (elem: CategoriesPin) => {
    handleSearchCategory(elem.id, elem.name);
    setModal(false);
  };

  return (
    <div
      className='relative bg-gray-200 flex flex-row gap-1 rounded-xl overflow-hidden category-card min-w-[178px] max-w-[301.63px] max-h-[105px] w-full z-10'
      onClick={() => handleClick(elem)}
    >
      <div
        className='w-[45%] bg-gray-500 p-3 rounded-l-xl overflow-hidden break-words overflow-ellipsis whitespace-nowrap h-full bg-cover bg-no-repeat bg-center relative z-0 flex justify-center items-center'
        style={{ backgroundImage: `url(${elem.poster})` }}
      >
        <p className='invisible absolute font-bold text-white text-lg z-20 text-border'>
          {t?.categories?.[`${elem.name}`] || elem.name}
        </p>
      </div>
      <div className='flex-grow p-1 flex justify-start items-center font-semibold py-[43px] h-full'>
        <p className=''>{t?.categories?.[`${elem.name}`] || elem.name}</p>
      </div>
      <div className='absolute inset-0 bg-black opacity-0 transition duration-100 hover:opacity-20 rounded-xl' />
    </div>
  );
};

export default CardCategoryModal;
