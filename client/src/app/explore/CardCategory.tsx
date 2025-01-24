import { CategoriesPin } from '../domain/types/pins-structure';
import { useRouter } from 'next/navigation';
import { useAppsStore } from '../infrastructure/stores/useAppStore';
import Atropos from 'atropos/react';
import 'atropos/css';

interface CardCategoryInterface {
  elem: CategoriesPin;
  page: number;
  limit: number;
}

const CardCategory = ({ elem, page = 1, limit }: CardCategoryInterface) => {
  const { getSearchPinForCategory, updateDataSearch, t } = useAppsStore();
  const router = useRouter();

  const handleClick = async (elem: CategoriesPin) => {
    updateDataSearch('value', '');
    updateDataSearch('categorySelect', elem.id);
    await getSearchPinForCategory(elem.id, page, limit);
    router.push(`/searchcategory/${elem.name}`);
  };

  return (
    <Atropos
      className='max-w-[400px] max-h-[300px] custom-atropos'
      activeOffset={40}
      shadow={true}
      highlight={true}
      innerClassName='rounded-3xl custom-atropos'
    >
      <div
        key={elem.id}
        className='bg-gray-300 p-5 rounded-3xl cursor-pointer bg-cover bg-center bg-no-repeat category-big-card transition-transform w-full h-full group hover:brightness-75'
        style={{ backgroundImage: `url(${elem.poster})` }}
        onClick={() => handleClick(elem)}
      >
        <div className='flex justify-center items-end w-full h-full'>
          <div className='relative'>
            <p className='font-bold text-2xl text-white text-border transition-transform transform group-hover:translate-y-[-10px] group-hover:rotateX-15 group-hover:scale-110 group-hover:rotateY-10'>
              {t?.categories[`${elem.name}`] || elem.name}
            </p>
          </div>
        </div>
      </div>
    </Atropos>
  );
};

export default CardCategory;
