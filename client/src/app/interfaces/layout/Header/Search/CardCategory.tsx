import { CategoriesPin } from '@/app/domain/types/pins-structure';

interface CardCategoryInterface {
  elem: CategoriesPin;
}

const CardCategory = ({ elem }: CardCategoryInterface) => {
  return (
    <div className='relative bg-gray-200 flex flex-row gap-2 rounded-xl overflow-hidden'>
      <div className='w-[40%] bg-gray-500 p-3 rounded-l-xl'>{elem.poster}</div>
      <div className='flex-grow p-3 flex justify-start items-start font-semibold text-sm py-[43px] overflow-hidden whitespace-nowrap text-ellipsis'>
        <p>{elem.name}</p>
      </div>
      <div className='absolute inset-0 bg-black opacity-0 transition duration-100 hover:opacity-20 rounded-xl' />
    </div>
  );
};

export default CardCategory;
