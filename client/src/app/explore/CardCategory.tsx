import { CategoriesPin } from '../domain/types/pins-structure';
import { useRouter } from 'next/navigation';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

interface CardCategoryInterface {
  elem: CategoriesPin;
  page: number;
  limit: number;
}

const CardCategory = ({ elem, page, limit }: CardCategoryInterface) => {
  const { getSearchPinForCategory, updateDataSearch } = useAppsStore();
  const router = useRouter();

  const handleClick = async (elem: CategoriesPin) => {
    console.log(elem);
    updateDataSearch('value', '');
    updateDataSearch('categorySelect', elem.id);
    await getSearchPinForCategory(elem.id, 1, limit);
    router.push(`/search?query=${elem.name}`);
  };

  return (
    <div
      key={elem.id}
      className=' bg-gray-300 p-5 w-[400px] h-[300px] rounded-3xl cursor-pointer'
      onClick={() => handleClick(elem)}
    >
      <div className='flex justify-center items-end w-full h-full'>
        <p className='font-bold text-2xl text-white'>{elem.name}</p>
      </div>
    </div>
  );
};

export default CardCategory;
