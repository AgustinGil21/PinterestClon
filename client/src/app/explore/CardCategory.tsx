import { CategoriesPin } from '../domain/types/pins-structure';
import { useRouter } from 'next/navigation';
import { useAppsStore } from '../infrastructure/stores/useAppStore';

interface CardCategoryInterface {
  elem: CategoriesPin;
  page: number;
  limit: number;
}

const CardCategory = ({ elem, page = 1, limit }: CardCategoryInterface) => {
  const { getSearchPinForCategory, updateDataSearch } = useAppsStore();
  const router = useRouter();

  const handleClick = async (elem: CategoriesPin) => {
    updateDataSearch('value', '');
    updateDataSearch('categorySelect', elem.id);
    await getSearchPinForCategory(elem.id, page, limit);
    router.push(`/search?query=${elem.name}`);
  };

  return (
    <div
      key={elem.id}
      className=' bg-gray-300 p-5 max-w-[400px] max-h-[300px] rounded-3xl cursor-pointer bg-cover bg-center bg-no-repeat category-big-card transition-transform'
      style={{ backgroundImage: `url(${elem.poster})` }}
      onClick={() => handleClick(elem)}
    >
      <div className='flex justify-center items-end w-full h-full '>
        <p className='font-bold text-2xl text-white text-border'>{elem.name}</p>
      </div>
    </div>
  );
};

export default CardCategory;
